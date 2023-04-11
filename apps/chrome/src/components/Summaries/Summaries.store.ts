import { AxiosInstance } from 'axios';
import { action, atom } from 'nanostores';
import { ENDPOINT, Summary } from 'shared/types/summary';

const summaries = atom<Summary[]>([]);
const accordionIndex = atom<number | undefined>();
const setAccordionIndex = action(
    accordionIndex,
    'setTooltipIndex',
    (state, tooltipIndex) => {
        state.set(tooltipIndex);
    },
);
const fetchSummaries = action(
    summaries,
    'fetchSummaries',
    async (state, axiosInstance: AxiosInstance) => {
        const response = await axiosInstance.get(`/${ENDPOINT}`);

        state.set(response.data);
    },
);

export const SummariesStateStore = {
    states: {
        summaries,
        accordionIndex,
    },
    actions: {
        setAccordionIndex,
        fetchSummaries,
    },
};
