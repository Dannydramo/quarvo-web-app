import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const response = NextResponse.json({
            message: 'Loggged out successfully',
            status: 200,
        });
        cookies().delete('name');
        return response;
    } catch (error) {
        return NextResponse.json({
            message: 'Internal server error',
            status: 500,
        });
    }
}
