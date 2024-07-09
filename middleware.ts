import { NextResponse, NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
    const authToken = request.cookies.has('token');

    if (authToken === false) {
        if (
            request.nextUrl.pathname === '/dashboard' ||
            request.nextUrl.pathname === '/bookings' ||
            request.nextUrl.pathname === '/book-event' ||
            request.nextUrl.pathname.includes('/profile')
        ) {
            return NextResponse.redirect(
                new URL('/event-center-login', request.url)
            );
        }
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
};

export const config = {
    matcher: [
        '/event-centres/:path*',
        '/event-centre/:path*',
        '/dashboard/:path*',
        '/profile/:path*',
        '/event-centre/:path*',
        '/bookings/:path*',
        '/book-event/:path*',
    ],
};
