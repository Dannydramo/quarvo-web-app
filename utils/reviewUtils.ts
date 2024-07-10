import { Axios } from '@/helpers/axioselpers';
import { LoginDetails, UserReg } from '@/types/onboarding';

let status: number;
let message: null;
let data: any;

export const fetchEventCentreReview = async (eventId: string) => {
    try {
        const response = await Axios({
            url: `/api/get-review/${eventId}`,
            method: 'get',
        });
        status = 200;
        data = response.data.eventCentreReviews;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, data, message };
};

export const postEventCentreReview = async (payload: any) => {
    try {
        const response = await Axios({
            url: `/api/post-review`,
            method: 'post',
            body: payload,
        });
        status = 200;
        data = response.data.message;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message };
};
