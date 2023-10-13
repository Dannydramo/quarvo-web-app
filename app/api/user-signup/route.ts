import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { PrismaClient } from '@prisma/client'
import { UserReg } from "@/types/onboarding";
import * as jose from 'jose'

const prisma = new PrismaClient()


export async function POST(req: NextRequest) {
    const { firstName, lastName, email, phoneNumber, password } = await req.json() as UserReg

    // const userWithEmail = await prisma.user.findUnique({
    //     where: {
    //         email
    //     }
    // })
    // if (userWithEmail) {
    //     return NextResponse.json({ message: 'Email is already associated with a user' })
    // }

    // const hashedPassword = await hash(password, 12);

}