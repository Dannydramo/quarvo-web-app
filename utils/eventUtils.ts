import { Axios } from '@/helpers/axioselpers';
import { EventCentreReg, LoginDetails } from '@/types/onboarding';

let status: number;
let message: null;
let data: any;

export const registerEventCentres = async (payload: EventCentreReg) => {
    try {
        const response = await Axios({
            url: '/api/event-center-signup',
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

export const loginEventCentre = async (payload: LoginDetails) => {
    try {
        const response = await Axios({
            url: '/api/event-center-login',
            method: 'post',
            body: payload,
        });
        status = 200;
        message = response.data.message;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { message, status };
};

export const fetchEventCentre = async () => {
    try {
        const response = await Axios({
            url: '/api/user/event-center',
            method: 'get',
        });
        status = 200;
        data = response.data.eventCentre;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, data, message };
};

export const postEventCentreDetails = async (payload: any) => {
    console.log(payload);

    try {
        const response = await Axios({
            url: '/api/post-event-details',
            method: 'post',
            body: payload,
        });
        status = 200;
        data = response.data.eventCentreDetails;
        message = response.data.message;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, data, message };
};

export const postEditCentreDetails = async (payload: any) => {
    try {
        const response = await Axios({
            url: '/api/edit-event-details',
            method: 'patch',
            body: payload,
        });
        status = 200;
        data = response.data.eventCentreDetails;
        message = response.data.message;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, data, message };
};

export const fetchEventCentreDetails = async () => {
    try {
        const response = await Axios({
            url: '/api/event-centre-details',
            method: 'get',
        });

        status = 200;
        data = response.data.eventCentreDetails;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, data, message };
};

export const fetchEventBookings = async () => {
    try {
        const response = await Axios({
            url: '/api/fetch-bookings',
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

export const checkEventAvailablity = async (
    formattedDate: string,
    eventCentreId: string
) => {
    const payload = {
        event_centre_id: eventCentreId,
        date: formattedDate,
    };
    try {
        const response = await Axios({
            url: '/api/check-event-availability',
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

export const bookEventCentre = async (payload: any) => {
    try {
        const response = await Axios({
            url: '/api/book-event',
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
