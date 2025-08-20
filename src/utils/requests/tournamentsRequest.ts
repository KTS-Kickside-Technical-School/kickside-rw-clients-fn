import axiosInstance from "../axios/axiosInstance";
import { handleError } from "./articlesRequest";

export const getHomepageMatches = async () => {
    try {
        const response = await axiosInstance.get("/api/tr/hp-matches");
        return response.data
    } catch (error: any) {
        return handleError(error)
    }
}