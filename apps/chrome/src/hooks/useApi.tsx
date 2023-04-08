import axios from 'axios';
import { NotificationStateStore } from '../components/Notification/Notification.store';

export function useApi() {
    const api = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL,
    });

    api.interceptors.response.use(null, responseErrorHandler);

    return { api };
}

function responseErrorHandler(error) {
    const { actions } = NotificationStateStore;

    actions.showNotification({
        color: 'error',
        text: 'Something went wrong, please try again ...',
    });
    return Promise.reject(error);
}
