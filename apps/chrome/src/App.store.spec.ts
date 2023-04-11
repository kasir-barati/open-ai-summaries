import { allTasks, cleanStores, keepMount } from 'nanostores';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { AppStore } from './App.store';

describe('AppStore', () => {
    let { actions, states } = AppStore;

    beforeEach(() => {
        keepMount(states.toggleDialog);
    });
    afterEach(async () => {
        cleanStores(states.toggleDialog);
        states.toggleDialog.set(false);
    });

    it('should close dialog', async () => {
        actions.closeDialog();
        await allTasks();

        expect(states.toggleDialog.get()).toBeFalsy();
    });

    it('should open dialog', async () => {
        actions.openDialog();
        await allTasks();

        expect(states.toggleDialog.get()).toBeTruthy();
    });
});
