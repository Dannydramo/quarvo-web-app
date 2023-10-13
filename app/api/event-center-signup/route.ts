import { EventCentreReg } from "@/types/onboarding";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import {PrismaClient} from '@prisma/client'

export async function POST(req: NextRequest) {
    // console.log(req);
    const registerDetails = await req.json() as EventCentreReg



    return NextResponse.json({ status: 200, message: 'request sent' })
}