import axiosInstance from "../axios/axiosInstance";
import { handleError } from "./articlesRequest";

export const subscribeToNewsLetter = async (email: string) => {
    try {
        const response = await axiosInstance.post('/api/subscribers/user-subcription', { email });
        return response.data;
    } catch (error: any) {
        return handleError(error);
    }
}

export const unsubscribeFromNewsLetter = async (email: string, token: string) => {
    try {
        const response = await axiosInstance.delete(`/api/subscribers/user-unsubcription?token=${token}&email=${email}`);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}