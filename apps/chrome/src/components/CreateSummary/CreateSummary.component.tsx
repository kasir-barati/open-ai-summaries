import { useEffect } from 'react';

export function CreateSummary() {
    useEffect(() => {
        chrome.runtime.onMessage.addListener((...args) => {
            console.log(args);
        });
    }, []);

    return <></>;
}
