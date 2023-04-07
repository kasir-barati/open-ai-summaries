import { action, atom } from 'nanostores';

const notification = atom<boolean | undefined>();
const showNotification = action(
    notification,
    'showNotification',
    (state) => {
        state.set(true);
    },
);
const closeNotification = action(
    notification,
    'closeNotification',
    (state) => {
        state.set(false);
    },
);

export const NotificationStateStore = {
    states: { notificationState: notification },
    actions: { showNotification, closeNotification },
};
