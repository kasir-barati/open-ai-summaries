import { allTasks, cleanStores, keepMount } from 'nanostores';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
    Notification,
    NotificationStateStore,
} from './Notification.store';

describe('NotificationStateStore', () => {
    const { actions, states } = NotificationStateStore;

    beforeEach(() => {
        keepMount(states.notification);
    });
    afterEach(() => {
        cleanStores(states.notification);
        states.notification.set(undefined);
    });

    it('should show notification', async () => {
        const notification: Notification = {
            text: 'Something went wrong, please try again ...',
            color: 'error',
        };
        actions.showNotification(notification);
        await allTasks();

        expect(states.notification.get()).toMatchObject(notification);
    });

    it('should close notification', async () => {
        actions.closeNotification();
        await allTasks();

        expect(states.notification.get()).toBeUndefined();
    });
});
