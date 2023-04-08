import { AlertColor } from '@mui/material';
import { action, atom } from 'nanostores';

type NotificationState = {
    open: boolean;
    text: string;
    color: AlertColor;
    autoHideDuration?: number;
};
export type Notification = Omit<NotificationState, 'open'>;

const notification = atom<NotificationState>();
const showNotification = action(
    notification,
    'showNotification',
    (state, notification: Notification) => {
        const { autoHideDuration = 6000, ...rest } = notification;
        state.set({ ...rest, autoHideDuration, open: true });
    },
);
const closeNotification = action(
    notification,
    'closeNotification',
    (state) => {
        state.set(undefined);
    },
);

export const NotificationStateStore = {
    states: { notification },
    actions: { showNotification, closeNotification },
};
