import { FormControl, FormControlLabel, Switch } from '@mui/material';
import { useStore } from '@nanostores/react';
import { ExtensionStateStore } from './ExtensionStatus.store';

export function ExtensionStatus() {
    const { states, actions } = ExtensionStateStore;
    const extensionStatus = useStore(states.extensionStatus);
    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        event.target.checked
            ? actions.enableExtension()
            : actions.disableExtension();
    };

    return (
        <FormControl fullWidth={true}>
            <FormControlLabel
                control={
                    <Switch
                        size="medium"
                        checked={extensionStatus}
                        color="warning"
                        onChange={handleChange}
                    />
                }
                label="Activate extension"
            />
        </FormControl>
    );
}
