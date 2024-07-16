import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function POST(req: NextRequest) {
    try {
        const {
            date,
            userId,
            event_centre_id,
            amount,
            physical_user_name,
            physical_user_email,
            physical_user_phone,
        } = await req.json();

        const newBooking = userId
            ? await prisma.booking.create({
                  data: {
                      date: new Date(date),
                      amount,
                      user: {
                          connect: { id: userId },
                      },
                      event_centre: {
                          connect: { id: event_centre_id },
                      },
                  },
              })
            : await prisma.booking.create({
                  data: {
                      event_centre: {
                          connect: { id: event_centre_id },
                      },
                      date: new Date(date),
                      amount,
                      physical_user_name,
                      physical_user_email,
                      physical_user_phone,
                  },
              });

        return NextResponse.json({
            message: 'Event centre booked successfully',
            status: 200,
        });
    } catch (error) {
        return NextResponse.json({
            message: 'Internal server error',
            status: 500,
        });
    }
}
