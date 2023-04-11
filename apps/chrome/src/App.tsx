import {
    Box,
    Button,
    CssBaseline,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { useStore } from '@nanostores/react';
import './App.css';
import { AppStore } from './App.store';
import { CreateSummary } from './components/CreateSummary/CreateSummary.component';
import { Notification } from './components/Notification/Notification.component';
import { Summaries } from './components/Summaries/Summaries.component';
import { ExtensionStatus } from './components/ToggleState/ExtensionStatus.component';

function App() {
    const { actions, states } = AppStore;
    const toggleDialog = useStore(states.toggleDialog);
    const handleCloseDialog = () => {
        actions.closeDialog();
    };
    const handleClickOpen = () => {
        actions.openDialog();
    };

    return (
        <>
            <CssBaseline />
            <Box padding={1}>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Activate or Deactivate extension
                </Button>
                <Dialog
                    open={toggleDialog}
                    scroll="paper"
                    fullWidth={true}
                >
                    <DialogTitle id="scroll-dialog-title">
                        Open AI Summaries
                    </DialogTitle>
                    <DialogContent dividers={true}>
                        <ExtensionStatus />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                <Summaries />
                <CreateSummary />
                <Notification />
            </Box>
        </>
    );
}

export default App;
