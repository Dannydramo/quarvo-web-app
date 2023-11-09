import { Axios } from "@/helpers/axioselpers";
import { getCookie } from "cookies-next";

let status: number;
let message: null;
let data: any;


export const fetchImages = async () => {
    const token = getCookie('jwtToken')
    try {
        const response = await Axios({
            url: '/api/fetch-event-images',
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        status = response.data.status
        data = response.data.eventCentreImages
    } catch (err: any) {
        status = err.response.status;
        message = err.response.data.message;
    }
    return { status, data, message }
}