import * as jose from 'jose';
export const verifyToken = async (
    token: string,
    secret: Uint8Array
): Promise<boolean> => {
    try {
        await jose.jwtVerify(token, secret);
        return true;
    } catch (error) {
        return false;
    }
};