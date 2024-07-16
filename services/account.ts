import { Axios } from '@/helpers/axioselpers';

let status: number;
let message: null;
let data: any;

export const editUserInfo = async (payload: any) => {
    try {
        const response = await Axios({
            url: '/api/auth/user/change-details',
            method: 'patch',
            body: payload,
        });

        status = 200;
        message = response.data.message;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message };
};

export const changeUserPasssword = async (payload: any) => {
    try {
        const response = await Axios({
            url: '/api/auth/user/change-password',
            method: 'patch',
            body: payload,
        });

        status = 200;
        message = response.data.message;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message };
};