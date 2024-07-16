import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';
export async function PATCH(req: NextRequest) {
    const { firstName, lastName, userId, phoneNumber } = await req.json();

    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                full_name: firstName + ' ' + lastName,
            },
        });

        return NextResponse.json({
            message: 'Profile details updated successfully',
            status: 200,
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Unable to change name',
            status: 500,
        });
    }
}
