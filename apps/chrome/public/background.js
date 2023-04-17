const BACKEND_URL = 'http://localhost:5000/api/v1/summaries';

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'summaryCreator',
        title: 'Create Summary',
        contexts: ['all'],
    });

    chrome.contextMenus.onClicked.addListener(async () => {
        const tab = await getCurrentTab();
        const highlightedText = (
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: () => getSelection().toString(),
            })
        )[0].result;

        // Sent the req here, UGLY
        const temp = await fetch(BACKEND_URL, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                highlight: highlightedText,
            }),
        }).catch(console.error);

        console.log(temp);
    });
});

async function getCurrentTab() {
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
    });

    return tab;
}
