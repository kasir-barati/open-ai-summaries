import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Box,
    IconButton,
    Typography,
} from '@mui/material';
import { useStore } from '@nanostores/react';
import { useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { SummariesStateStore } from './Summaries.store';

export function Summaries() {
    const { api } = useApi();
    const { states, actions } = SummariesStateStore;
    const summaries = useStore(states.summaries);
    const accordionIndex = useStore(states.accordionIndex);
    const deleteSummary = () => {};
    const handleAccordionOnChange = (index: number) => {
        if (index === accordionIndex) {
            return actions.setAccordionIndex(undefined);
        }
        actions.setAccordionIndex(index);
    };

    useEffect(() => {
        actions.fetchSummaries(api);
        window.addEventListener('mouseup', (_event: MouseEvent) => {
            console.log(window.getSelection().toString());
        });
    }, []);

    return (
        <Box>
            <Typography variant="h5" color="black" marginY={3}>
                Summaries
            </Typography>
            {summaries &&
                summaries.map(({ highlight, summary }, index) => {
                    return (
                        <Accordion
                            key={index}
                            expanded={accordionIndex === index}
                            onChange={() => {
                                handleAccordionOnChange(index);
                            }}
                        >
                            <AccordionSummary
                                expandIcon={
                                    <ArrowDropDownCircleIcon />
                                }
                            >
                                {highlight}
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography textAlign="justify">
                                    {summary}
                                </Typography>
                            </AccordionDetails>
                            <AccordionActions>
                                <IconButton
                                    sx={{ marginRight: '1px' }}
                                    edge="end"
                                    onClick={deleteSummary}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </AccordionActions>
                        </Accordion>
                    );
                })}
        </Box>
    );
}
