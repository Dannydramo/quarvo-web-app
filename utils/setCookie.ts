import { NextResponse } from 'next/server';

export function setCookie(response: NextResponse, name: string, value: string) {
    const cookiesOption = {
        expires: new Date(
            Date.now() +
                Number(process.env.JWT_COOKIE_EXPIRES_IN) * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: 'none' as const,
        partition: true,
        secure: true,
    };

    response.cookies.set(name, value, cookiesOption);
}
