import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const getToken = () => {
    const token = sessionStorage.getItem('token');

    if (token) {
        return token;
    }
}

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        } else {
            config.headers['Content-Type'] = 'application/json';
        }
        return config;
    },
    (error) => Promise.reject(error)
);

const getErrorMessage = (msg: unknown): string => {
    if (axios.isAxiosError(msg) && msg.response) {
        return msg.response.data.message || msg.response.data.error;
    }
    return "An unknown error occurred";
};

export { axiosInstance, getErrorMessage };