import { allTasks, cleanStores, keepMount } from 'nanostores';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ExtensionStateStore } from './ExtensionStatus.store';

describe('ExtensionStateStore', () => {
    let { actions, states } = ExtensionStateStore;

    afterEach(async () => {
        cleanStores(states.extensionStatus);
        states.extensionStatus.set(false);
    });

    beforeEach(() => {
        keepMount(states.extensionStatus);
    });

    it('should enable extension', async () => {
        actions.enableExtension();
        await allTasks();

        expect(states.extensionStatus.get()).toBeTruthy();
    });

    it('should disable extension', async () => {
        actions.disableExtension();
        await allTasks();

        expect(states.extensionStatus.get()).toBeFalsy();
    });
});
