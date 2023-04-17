const BACKEND_URL = 'http://localhost:5000/api/v1/summaries';

document.onreadystatechange = async function () {
    if (document.readyState == 'complete') {
        await doHighlight();
    }
};

async function doHighlight() {
    const response = await fetch(BACKEND_URL, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
    });

    if (!response.ok) {
        throw new Error('Could not fetch highlights from backend');
    }

    const highlights = await response.json();
    const bodyElement = document.getElementsByTagName('body')[0];

    for (const highlight of highlights) {
        const markInstance = new Mark(bodyElement);
        const options = {
            acrossElements: true,
            separateWordSearch: false,
            // caseSensitive: true,
            diacritics: false,
            // accuracy: 'exactly',
            each: (element) => {
                element.setAttribute('title', highlight.summary);
            },
        };
        setTimeout(() => {
            markInstance.mark(highlight.highlight, options);
        }, 1000);
    }
}
