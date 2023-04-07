import { AxiosInstance, AxiosResponse } from 'axios';
import { allTasks, cleanStores, keepMount } from 'nanostores';
import { vi } from 'vitest';
import summaries from './summaries.dummy-data.json';
import { SummariesStateStore } from './Summaries.store';

describe('SummariesStateStore', () => {
    const { states, actions } = SummariesStateStore;
    const mockedAxiosInstance: AxiosInstance =
        {} as Partial<AxiosInstance> as AxiosInstance;

    afterEach(() => {
        cleanStores(states.accordionIndex, states.summaries);
        states.accordionIndex.set(undefined);
        states.summaries.set([]);
    });

    describe('accordionIndexState', () => {
        beforeEach(() => {
            keepMount(states.accordionIndex);
        });

        it('should return 1 ', async () => {
            actions.setAccordionIndex(1);
            await allTasks();

            expect(states.accordionIndex.get()).toBe(1);
        });
    });

    describe('summaries', () => {
        it('should fetch summaries', async () => {
            mockedAxiosInstance.get = vi.fn().mockResolvedValueOnce({
                data: summaries,
            } as AxiosResponse);
            await actions.fetchSummaries(mockedAxiosInstance);
            await allTasks();

            expect(states.summaries.get()).toBe(summaries);
        });
    });
});
