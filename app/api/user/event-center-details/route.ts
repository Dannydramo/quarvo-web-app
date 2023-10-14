import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {

    const bearerToken = req.headers.get("authorization")

    if (!bearerToken) {
        return NextResponse.json({ message: 'Unauthorized' })
    }
    const token = bearerToken.split(" ")[1]
    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' })
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET)

    try {
        await jose.jwtVerify(token, secret)

    } catch (error) {
        return NextResponse.json({ message: 'Unauthorized', status: 401 })
    }

    const payload = jwt.decode(token) as { email: string }

    if (!payload.email) {
        return NextResponse.json({ message: 'Unauthorized', status: 401 })
    }

    const eventCentre = await prisma.eventCentre.findUnique({
        where: {
            email: payload.email
        }
    })
    return NextResponse.json({ message: 'Event Centre', status: 200, eventCentre })
}