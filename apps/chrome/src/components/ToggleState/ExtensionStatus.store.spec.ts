import { allTasks, cleanStores, keepMount } from 'nanostores';
import { ExtensionStateStore } from './ExtensionStatus.store';

describe('ExtensionStateStore', () => {
    let { actions, states } = ExtensionStateStore;

    afterEach(async () => {
        cleanStores(states.extensionStatus, states.toggleDialog);
        states.extensionStatus.set(false);
        states.toggleDialog.set(false);
    });

    describe('extensionStatus', () => {
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

    describe('toggleDialog', () => {
        beforeEach(() => {
            keepMount(states.toggleDialog);
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
});
