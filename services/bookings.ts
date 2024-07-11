import { Axios } from '@/helpers/axioselpers';

let status: number;
let message: null;
let data: any;

export const fetchUserEventBookings = async () => {
    try {
        const response = await Axios({
            url: '/api/fetch-user-bookings',
            method: 'get',
        });

        status = 200;
        data = response.data.eventCentreBooking;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, data, message };
};
