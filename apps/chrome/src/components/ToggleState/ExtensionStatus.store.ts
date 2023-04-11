import { persistentAtom } from '@nanostores/persistent';
import { action } from 'nanostores';

export type ExtensionState = 'on' | 'off';

const extensionStatus = persistentAtom<ExtensionState>(
    'extensionStatus',
    'off',
);
const enableExtension = action(
    extensionStatus,
    'enableExtension',
    (store) => {
        store.set('on');
    },
);
const disableExtension = action(
    extensionStatus,
    'disableExtension',
    (store) => {
        store.set('off');
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
