import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { useStore } from '@nanostores/react';
import { useEffect } from 'react';
import './App.css';
import { AppStore } from './App.store';
import { Summaries } from './components/Summaries/Summaries.component';
import { ExtensionStatus } from './components/ToggleState/ExtensionStatus.component';

function App() {
    const { actions, states } = AppStore;
    const toggleDialog = useStore(states.toggleDialog);
    const handleCloseDialog = () => {
        actions.closeDialog();
    };

    useEffect(() => {
        actions.openDialog();
    }, []);

    return (
        <Dialog open={toggleDialog} scroll="paper" fullWidth={true}>
            <DialogTitle id="scroll-dialog-title">
                Open AI Summaries
            </DialogTitle>
            <DialogContent dividers={true}>
                <ExtensionStatus />
                <Summaries />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default App;
