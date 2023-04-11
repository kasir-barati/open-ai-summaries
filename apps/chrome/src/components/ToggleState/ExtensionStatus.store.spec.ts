import { allTasks, cleanStores, keepMount } from 'nanostores';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
    ExtensionState,
    ExtensionStateStore,
} from './ExtensionStatus.store';

describe('ExtensionStateStore', () => {
    let { actions, states } = ExtensionStateStore;

    afterEach(async () => {
        cleanStores(states.extensionStatus);
        states.extensionStatus.set('off');
    });

    beforeEach(() => {
        keepMount(states.extensionStatus);
    });

    it('should enable extension', async () => {
        actions.enableExtension();
        await allTasks();

        expect(states.extensionStatus.get()).toBe(
            'on' as ExtensionState,
        );
    });

    it('should disable extension', async () => {
        actions.disableExtension();
        await allTasks();

        expect(states.extensionStatus.get()).toBe(
            'off' as ExtensionState,
        );
    });
});
