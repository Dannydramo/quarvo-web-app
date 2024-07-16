import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const response = NextResponse.json({
            message: 'Loggged out successfully',
            status: 200,
        });
        response.cookies.delete('token');
        return response;
    } catch (error) {
        return NextResponse.json({
            message: 'Internal server error',
            status: 500,
        });
    }
}
