import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function POST(req: NextRequest) {
    try {
        const { eventCentreId, comment, userFullName, rating } =
            await req.json();

        const newReview = await prisma.review.create({
            data: {
                review_comment: comment,
                full_name: userFullName,
                rating,
                event_centre_reviewed: {
                    connect: { id: eventCentreId },
                },
            },
        });

        return NextResponse.json({
            message: 'Review submitted successfully.',
            status: 200,
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
