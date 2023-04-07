import { action, atom } from 'nanostores';

const extensionStatus = atom<boolean>(false);
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
        extensionStatus,
    },
    actions: {
        enableExtension,
        disableExtension,
    },
};
