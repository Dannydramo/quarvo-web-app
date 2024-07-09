import { Axios } from '@/helpers/axioselpers';
import { LoginDetails, UserReg } from '@/types/onboarding';

let status: number;
let message: null;
let data: any;

export const registerUser = async (payload: UserReg) => {
    try {
        const response = await Axios({
            url: '/api/user-signup',
            method: 'post',
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

export const loginUser = async (payload: LoginDetails) => {
    try {
        const response = await Axios({
            url: '/api/user-login',
            method: 'post',
            body: payload,
        });
        status = response.data.status;
        message = response.data.message;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { message, status };
};

export const fetchUser = async () => {
    try {
        const response = await Axios({
            url: '/api/user/user-details',
            method: 'get',
        });
        console.log(response);

        status = 200;
        data = response.data.user;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, data, message };
};
