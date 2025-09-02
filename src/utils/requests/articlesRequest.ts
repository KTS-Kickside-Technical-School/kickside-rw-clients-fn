import axiosInstance from "../axios/axiosInstance";
import { iComment } from "../types/commentType";

export const handleError = (error: unknown): { status: number; message: string } => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as any).response === 'object' &&
    (error as any).response !== null
  ) {
    const err = error as {
      response: {
        status: number;
        data?: {
          message?: string;
        };
      };
    };

    return {
      status: err.response.status,
      message: err.response.data?.message || 'Something went wrong. Please try again.',
    };
  }

  return {
    status: 500,
    message: (error as any).message || 'Unexpected error occurred. Please try again.',
  };
};


export const getPublishedArticles = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/articles/get-published-articles"
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getSingleArticle = async (slug: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/articles/get-single-article/${slug}`
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};


export const postComment = async (data: iComment) => {
  try {
    const response = await axiosInstance.post(
      "/api/articles/post-comments",
      data
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};


export const getAuthorsProfile = async (username: string) => {
  try {
    const response = await axiosInstance.get(`/api/articles/get-author-profile/${username}`);
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const getArticlesByCategory = async (category: string, language: any) => {
  try {
    const response = await axiosInstance.get(
      `api/articles/get-articles-by-category/${category}?language=${language}`
    );

    return response.data;
  } catch (error) {
    return handleError(error);
  }
};



export const getPopularArticles = async (language: any) => {
  try {
    const response = await axiosInstance.get(`/api/articles/get-popular-articles?language=${language}`);
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const getTopFeaturedArticles = async (language = "") => {
  try {
    const response = await axiosInstance.get(`/api/articles/get-top-featured-articles/?language=${language}`);

    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const getTOpWeeklyArticlesByCategories = async (language: any) => {
  try {

    const response = await axiosInstance.get(`/api/articles/get-top-weekly-categories?language=${language}`);
    return response.data

  } catch (error) {
    return handleError(error)
  }
}

export const getUserSearch = async (query: string, page = 1, limit = 35) => {
  try {
    const response = await axiosInstance.get(`/api/articles/user-search?query=${query}&page=${page}&limit=${limit}`);
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

export const getLatestCustomizedArticles = async (limit = 25) => {
  try {
    const response = await axiosInstance.get(`/api/articles//get-latest-articles-customized?limit=${limit}`);
    return response.data
  } catch (error) {
    return handleError(error)
  }
}