import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { PrismaClient } from '@prisma/client'
import * as jose from 'jose'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    const { email, password } = await req.json()

    const eventCentreWithEmail = await prisma.eventCentre.findUnique({
        where: {
            email
        }
    })

    if (!eventCentreWithEmail) {
        return NextResponse.json({ message: 'Account not found', status: 401 })
    }
    const passwordIsMatch = await compare(password, eventCentreWithEmail.password)
    if (!passwordIsMatch) {
        return NextResponse.json({ message: 'Password is incorrect', status: 401 })
    }

    const alg = "HS256"
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)

    const token = await new jose.SignJWT({ email: eventCentreWithEmail.email }).setProtectedHeader({ alg }).setExpirationTime("5m").sign(secret)

    return NextResponse.json({ message: 'Login successfully', status: 200, token });
}
