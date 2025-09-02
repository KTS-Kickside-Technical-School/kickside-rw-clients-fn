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

export const getLatestSeasons = async () => {
    try {
        const response = await axiosInstance.get("/api/tr/tr-latest-seasons")
        return response.data

    } catch (error) {
        return handleError(error);
    }
}

export const getMatches = async (filters = {}) => {
    try {
        const queryString = new URLSearchParams(
            Object.entries(filters)
                .filter(([_, value]) => value !== undefined && value !== null)
                .map(([key, value]) => [key, String(value)])
        ).toString();

        const response = await axiosInstance.get(`/api/tr/matches?${queryString}`);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

export const getTournamentMatches = async (slug: string) => {
    try {
        const encodedSlug = encodeURIComponent(slug);
        const response = await axiosInstance.get(`/api/tr/${encodedSlug}/matches`);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
};

export const getSingleMatch = async (slug: string) => {
    try {
        const encodedSlug = encodeURIComponent(slug);
        const response = await axiosInstance.get(`/api/tr/full-match/${encodedSlug}`);
        return response.data;
    } catch (error) {
        return handleError(error);
    }
}