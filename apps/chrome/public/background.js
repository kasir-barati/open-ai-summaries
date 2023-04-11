chrome.contextMenus.create({
    id: 'summaryCreator',
    title: 'Create Summary',
    contexts: ['all'],
});

chrome.contextMenus.onClicked.addListener(async () => {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });
    const highlightedText = (
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => getSelection().toString(),
        })
    )[0].result;

    // Sent the req here, UGLY
    await fetch('http://localhost:5000/api/v1/summaries', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            highlight: highlightedText,
        }),
    });
});
