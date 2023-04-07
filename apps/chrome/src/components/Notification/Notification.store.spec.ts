import { allTasks, cleanStores, keepMount } from 'nanostores';
import { NotificationStateStore } from './Notification.store';

describe('NotificationStateStore', () => {
    const { actions, states } = NotificationStateStore;

    beforeEach(() => {
        keepMount(states.notificationState);
    });
    afterEach(() => {
        cleanStores(states.notificationState);
        states.notificationState.set(undefined);
    });

    it('should show notification', async () => {
        actions.showNotification();
        await allTasks();

        expect(states.notificationState.get()).toBeTruthy();
    });

    it('should close notification', async () => {
        actions.closeNotification();
        await allTasks();

        expect(states.notificationState.get()).toBeFalsy();
    });
});
