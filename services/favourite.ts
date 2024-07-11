import { Axios } from '@/helpers/axioselpers';

let status: number;
let message: null;
let data: any;

export const postFavouriteEventCentres = async (payload: any) => {
    try {
        const response = await Axios({
            url: '/api/post-favorite-event-centres',
            method: 'post',
            body: payload,
        });
        status = response.data.status;
        message = response.data.message;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message };
};

export const getFavouriteEventCentres = async (userId: string) => {
    try {
        const response = await Axios({
            url: `/api/get-favorite-event-centres?userId=${userId}`,
            method: 'get',
        });
        status = response.data.status;
        message = response.data.message;
        data = response.data.eventCentres;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const getFavouriteStatus = async (payload: any) => {
    try {
        const response = await Axios({
            url: `/api/get-favorite-event-centres-status?userId=${payload.userId}&eventCentreId=${payload.eventCentreId}`,
            method: 'get',
        });
        status = response.data.status;
        message = response.data.message;
        data = response.data.isFavourite;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};

export const removeFromFravourite = async (payload: any) => {
    try {
        const response = await Axios({
            url: `/api/remove-favorite-event-centre?userId=${payload.userId}&eventCentreId=${payload.eventCentreId}`,
            method: 'delete',
        });
        status = response.data.status;
        message = response.data.message;
        data = response.data.isFavourite;
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, message, data };
};
