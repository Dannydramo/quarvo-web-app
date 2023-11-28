import { Axios } from "@/helpers/axioselpers";
import { EventCentreReg, LoginDetails } from "@/types/onboarding";
import { getCookie, setCookie } from "cookies-next";

let status: number;
let message: null;
let data: any;

export const registerEventCentres = async (payload: EventCentreReg) => {
    try {
        const response = await Axios({
            url: '/api/event-center-signup',
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

export const loginEventCentre = async (payload: LoginDetails) => {
    try {
        const response = await Axios({
            url: '/api/event-center-login',
            method: 'post',
            body: payload
        })
        status = response.data.status
        message = response.data.message
        const authToken = response.data.token
        setCookie('jwtToken', authToken, { secure: true, maxAge: 60 * 6 * 24 })
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { message, status }
}

export const fetchEventCentre = async () => {
    const token = getCookie('jwtToken')
    try {
        const response = await Axios({
            url: '/api/user/event-center',
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        status = 200
        data = response.data.eventCentre
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, data, message }
}

export const postEventCentreDetails = async (payload: any) => {
    try {
        const response = await Axios({
            url: '/api/event-centre-details',
            method: 'post',
            body: payload
        })
        status = 200
        data = response.data.eventCentreDetails
        message = response.data.message
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, data, message }
}

export const postEditCentreDetails = async (payload: any) => {
    try {
        const response = await Axios({
            url: '/api/edit-profile',
            method: 'patch',
            body: payload
        })
        status = 200
        data = response.data.eventCentreDetails
        message = response.data.message
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, data, message }
}

export const fetchEventCentreDetails = async () => {
    const token = getCookie('jwtToken')
    try {
        const response = await Axios({
            url: '/api/fetch-centre-details',
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        status = 200
        data = response.data.eventCentreDetails
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, data, message }
}

export const fetchEventBookings = async () => {
    const token = getCookie('jwtToken')
    try {
        const response = await Axios({
            url: '/api/fetch-bookings',
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        status = 200
        data = response.data.eventCentreBooking
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, data, message }
}

export const checkEventAvailablity = async (eventCentreId: string, formattedDate: string, userId: string | undefined) => {
    const payload = {
        eventCentreId,
        formattedDate,
        userId
    }
    try {
        const response = await Axios({
            url: '/api/check-availability',
            method: 'post',
            body: payload
        })
        status = 200
        message = response.data.message
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message }
}

export const bookEventCentre = async (eventCentreId: string, formattedDate: string | undefined, userId: string | undefined) => {
    const payload = {
        eventCentreId,
        formattedDate,
        userId
    }
    try {
        const response = await Axios({
            url: '/api/book-event',
            method: 'post',
            body: payload
        })
        status = 200
        message = response.data.message
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message }
}