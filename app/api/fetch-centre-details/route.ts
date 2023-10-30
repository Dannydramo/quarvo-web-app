import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {

    const bearerToken = req.headers.get("authorization")

    if (!bearerToken) {
        return NextResponse.json({ message: 'Unable to get user details', status: 401 })
    }
    const token = bearerToken.split(" ")[1]
    if (!token) {
        return NextResponse.json({ message: 'Unable to get user details', status: 401 })
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET)

    try {
        await jose.jwtVerify(token, secret)

    } catch (error) {
        return NextResponse.json({ message: 'Unable to get user details', status: 401 })
    }

    const payload = jwt.decode(token) as { email: string }

    if (!payload.email) {
        return NextResponse.json({ message: 'Unable to get user details', status: 401 })
    }

    const eventCentre = await prisma.eventCentre.findUnique({
        where: {
            email: payload.email
        },
        select: {
            id: true,
        }
    })

    const eventCentreDetails = await prisma.eventCentreDetails.findUnique({
        where: {
            event_centre_id: eventCentre?.id
        }
    })

    return NextResponse.json({ message: 'Event Centre Details', status: 200, eventCentreDetails })
}