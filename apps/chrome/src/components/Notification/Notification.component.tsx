import {
    Alert,
    AlertColor,
    Snackbar,
    SnackbarCloseReason,
} from '@mui/material';
import { useStore } from '@nanostores/react';
import { useEffect } from 'react';
import { NotificationStateStore } from './Notification.store';

export function Notification({
    text,
    color,
    autoHideDuration = 6000,
}: {
    text: string;
    color: AlertColor;
    autoHideDuration?: number;
}) {
    const { actions, states } = NotificationStateStore;
    const notificationState = useStore(states.notificationState);
    const handleClose = (
        event: Event | React.SyntheticEvent<any, Event>,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        actions.closeNotification();
    };

    useEffect(() => {
        actions.showNotification();
    }, []);

    return (
        <Snackbar
            open={notificationState}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={color}
                sx={{ width: '100%' }}
            >
                {text}
            </Alert>
        </Snackbar>
    );
}
