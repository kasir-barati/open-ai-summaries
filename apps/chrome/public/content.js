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

    let highlights = await response.json();
    highlights = highlights.map(({ highlight }) => highlight);

    const bodyElement = document.getElementsByTagName('body')[0];

    const markInstance = new Mark(bodyElement);
    const options = {
        acrossElements: true,
        separateWordSearch: false,
        // caseSensitive: true,
        diacritics: false,
        // accuracy: 'exactly',
    };

    for (const highlight of highlights) {
        markInstance.mark(highlight, options);
    }
}
