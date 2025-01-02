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