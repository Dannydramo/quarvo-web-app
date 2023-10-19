import { Axios } from "@/helpers/axioselpers";
import { UserReg } from "@/types/onboarding";

let status: number;
let message: null;
let data: any;

export const registerUser = async (payload: UserReg) => {
    try {
        const response = await Axios({
            url: '/api/user-signup',
            method: 'post',
            body: payload
        })
        status = 200
        message = response.data.message;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message };
}