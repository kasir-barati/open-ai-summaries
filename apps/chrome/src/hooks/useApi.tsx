import axios from 'axios';
import { Notification } from '../components/Notification/Notification.component';

export function useApi() {
    const api = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL,
    });

    api.interceptors.response.use(null, responseErrorHandler);

    return { api };
}

function responseErrorHandler(error) {
    <Notification
        color="error"
        text="Something went wrong, please try again ..."
    />;

    return Promise.reject(error);
}
