import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function GET(
    req: NextRequest,
    { params }: { params: { userId: string } }
) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: params.userId,
            },
            select: {
                full_name: true,
            },
        });
        return NextResponse.json({
            message: 'Reviews fetched successfully.',
            status: 200,
            user,
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}
