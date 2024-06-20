import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';
export async function GET(
    req: NextRequest,
    { params }: { params: { eventId: string } }
) {
    try {
        const eventCentreReviews = await prisma.eventCentre.findUnique({
            where: {
                id: params.eventId,
            },
            select: {
                reviews: {
                    select: {
                        id: true,
                        full_name: true,
                        review_comment: true,
                        created_at: true,
                        updatedAt: true,
                    },
                },
            },
        });
        return NextResponse.json({
            message: 'Reviews fetched successfully.',
            status: 200,
            eventCentreReviews,
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
