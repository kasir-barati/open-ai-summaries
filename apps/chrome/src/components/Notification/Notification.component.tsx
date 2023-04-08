import {
    Alert,
    Slide,
    Snackbar,
    SnackbarCloseReason,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useStore } from '@nanostores/react';
import { NotificationStateStore } from './Notification.store';

export function Notification() {
    const { actions, states } = NotificationStateStore;
    const notificationState = useStore(states.notification);
    const handleClose = (
        event: Event | React.SyntheticEvent<any, Event>,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        actions.closeNotification();
    };

    if (!notificationState) {
        return <></>;
    }

    return (
        <Snackbar
            open={notificationState.open}
            autoHideDuration={notificationState.autoHideDuration}
            onClose={handleClose}
            TransitionComponent={TransitionLeftDirection}
        >
            <Alert
                onClose={handleClose}
                severity={notificationState.color}
                sx={{ width: '100%' }}
            >
                {notificationState.text}
            </Alert>
        </Snackbar>
    );
}

function TransitionLeftDirection(props: TransitionProps) {
    return <Slide {...props} direction="left" />;
}
