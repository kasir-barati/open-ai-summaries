import { action, atom } from 'nanostores';

const extensionStatus = atom<boolean>(false);
const toggleDialog = atom<boolean>(false);
const openDialog = action(toggleDialog, 'openDialog', (store) => {
    store.set(true);
});
const closeDialog = action(toggleDialog, 'closeDialog', (store) => {
    store.set(false);
});
const enableExtension = action(
    extensionStatus,
    'enableExtension',
    (store) => {
        store.set(true);
    },
);
const disableExtension = action(
    extensionStatus,
    'disableExtension',
    (store) => {
        store.set(false);
    },
);

export const ExtensionStateStore = {
    states: {
        toggleDialog,
        extensionStatus,
    },
    actions: {
        enableExtension,
        disableExtension,
        openDialog,
        closeDialog,
    },
};
