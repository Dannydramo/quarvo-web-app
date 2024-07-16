import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';
import { compare, hash } from 'bcryptjs';

export async function PATCH(req: NextRequest) {
    const { currentPassword, newPassword, userId } = await req.json();

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json({
                message: 'User not found',
                status: 404,
            });
        }
        const isPasswordValid = await compare(currentPassword, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({
                message: 'Current password is incorrect',
                status: 400,
            });
        }

        const hashedNewPassword = await hash(newPassword, 12);
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedNewPassword },
        });

        const response = NextResponse.json({
            message: 'Password changed successfully',
            status: 200,
        });
        response.cookies.delete('token');
        return response;
    } catch (error) {
        return NextResponse.json({
            message: 'Unable to change password',
            status: 500,
        });
    }
}
