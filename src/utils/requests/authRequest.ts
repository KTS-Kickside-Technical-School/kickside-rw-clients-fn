import axiosInstance from "../axios/axiosInstance";
import { User } from "../types/User";
import { handleError } from "./articlesRequest";

export const userLogin = async (user: User): Promise<any> => {
    try {
        const response = await axiosInstance.post('/api/auth/login', user);
        return response.data;
    } catch (error: any) {
        return handleError(error);
    }
}

export const userForgotPassword = async (email: string): Promise<any> => {
    try {
        const response = await axiosInstance.post('/api/auth/forgot-password', { email });
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}

export const userResetPassword = async (
    token: string,
    password: string
): Promise<any> => {
    try {
        const response = await axiosInstance.post('/api/auth/reset-password', { token, password });
        return response.data;
    } catch (error) {
        return handleError(error)
    }
}