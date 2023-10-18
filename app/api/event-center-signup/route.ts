import { EventCentreReg } from "@/types/onboarding";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { PrismaClient } from '@prisma/client'
import * as jose from 'jose'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    const { eventCentreName, password, state, email, phoneNumber } = await req.json() as EventCentreReg

    const eventCentreWithEmail = await prisma.eventCentre.findUnique({
        where: {
            email
        }
    })

    if (eventCentreWithEmail) {
        return NextResponse.json({ message: 'Email is already associated with an Event Centre', status: 401 })
    }

    const hashedPassword = await hash(password, 12);
    const slugText = eventCentreName.toLowerCase().replace(/ /g, '-')

    let location = await prisma.location.findUnique({
        where: {
            state: state,
        },
    });





    if (!location) {
        location = await prisma.location.create({
            data: {
                state: state,
            }
        });
    }

    const eventCentre = await prisma.eventCentre.create({
        data: {
            event_centre_name: eventCentreName,
            email: email,
            password: hashedPassword,
            state: state,
            phone_number: phoneNumber,
            slug: slugText,
            location: { connect: { id: location.id } }
        },
    });

    // Add the created EventCentre to the associated Location's eventCentres array
    const updatedLocation = await prisma.location.update({
        where: { id: location.id },
        data: { event_centres: { connect: { id: eventCentre.id } } },
    });



    const alg = "HS256"
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)

    const token = await new jose.SignJWT({ email: eventCentre.email }).setProtectedHeader({ alg }).setExpirationTime("24h").sign(secret)

    return NextResponse.json({ message: 'Event Centre Account created successfully', status: 200, token });
}
