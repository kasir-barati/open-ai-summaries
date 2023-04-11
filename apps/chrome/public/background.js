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
    const selectedText = (
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => getSelection().toString(),
        })
    )[0].result;

    await chrome.tabs.sendMessage(tab.id, {
        type: 'createSummary',
        highlight: selectedText,
    });
});
