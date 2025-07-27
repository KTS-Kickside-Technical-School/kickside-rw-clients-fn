import axiosInstance from "../axios/axiosInstance";
import { handleError } from "./articlesRequest";



export const sendInquiry = async (data: any) => {
    try {
        const response = await axiosInstance.post("/api/inquiry/create-inquiry", {
            topic: data.inquiry,
            message: data.message,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName
        });
        return response.data
    } catch (error) {
        return handleError(error)
    }
}