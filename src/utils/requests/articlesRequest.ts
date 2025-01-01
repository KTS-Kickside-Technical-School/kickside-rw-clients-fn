import axiosInstance from "../axios/axiosInstance"

export const handleError = (error: any) => {
    if (error.response) {
        return {
            status: error.response.status,
            message:
                error.response.data.message ||
                "Something went wrong. Please try again.",
        };
    }
    return {
        status: 500,
        message: error.message || "Unexpected error occurred. Please try again.",
    };
};

export const getPublishedArticles = async () => {
    try {
        const response = await axiosInstance.get("/api/articles/get-published-articles");
        return response.data
    } catch (error: any) {
        return handleError(error)
    }
}

export const getSingleArticle = async (slug: String) => {
    try {
        const response = await axiosInstance.get(`/api/articles/get-single-article/${slug}`);
        return response.data
    } catch (error: any) {
        return handleError(error)
    }
}