import { axiosInstance } from "../axios/axiosInstance";

export const getAllArticles = async () => {
    try {
        const response = await axiosInstance.get("/api/articles/");
        if (response.data.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.data
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}