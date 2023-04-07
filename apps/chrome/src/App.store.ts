import { action, atom } from 'nanostores';

const toggleDialog = atom<boolean>(false);
const openDialog = action(toggleDialog, 'openDialog', (store) => {
    store.set(true);
});
const closeDialog = action(toggleDialog, 'closeDialog', (store) => {
    store.set(false);
});

export const AppStore = {
    states: {
        toggleDialog,
    },
    actions: {
        openDialog,
        closeDialog,
    },
};
