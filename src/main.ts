import Tab = browser.tabs.Tab;

/**
 * main.ts
 **/

browser.commands.onCommand.addListener(command => {
    if (command == 'search-with-google') {
        console.debug('Command: search-with-google');
        searchWithGoogle().catch(console.error);
    }
});

/**
 * search-with-google-command.ts
 **/

const START_PAGE = 'www.startpage.com';
const DUCK_DUCK_GO = 'www.duckduckgo.com';
const GOOGLE_SEARCH_URL = 'http://www.google.com/search?q=';

interface QueryContext {
    tab: Tab,
    query: string
}

function searchWithGoogle(): Promise<void> {
    return getCurrentTab()
        .then((tab: Tab) => {
            if (tab.url === undefined) {
                throw 'Current Tab has no URL';
            }

            const query = getQueryBasedOnSearchEngine(new URL(tab.url));

            return { tab, query };
        })
        .then(({ query, tab }: QueryContext) => {
            if (tab.id === undefined) {
                throw 'No tab id';
            }

            changeLocation(query, tab.id);
        });
}

function getQueryBasedOnSearchEngine(url: URL): string | never {
    let queryKey = null;
    switch (url.host) {
    case START_PAGE:
        queryKey = 'query';
        break;
    case DUCK_DUCK_GO:
        queryKey = 'q';
        break;
    }

    if (queryKey == null) {
        throw `Search engine "${url.host}" not supported`;
    }

    const query = url.searchParams.get(queryKey);
    if (query == null) {
        throw `Query key "${queryKey}" in search engine "${url.host}" is null`;
    }

    return query;
}

function changeLocation(query: string, tabId: number): void {
    let newUrl = GOOGLE_SEARCH_URL + query;
    browser.tabs.update(tabId, { url: newUrl })
           .then(() => {
               // NOTE: google search is opened in his own new tab (Containers). So the previous one is closed.
               return setTimeout(() => browser.tabs.remove(tabId), 200);
           });
}

/**
 * tab-utils.ts
 **/

function getCurrentTab(): Promise<Tab> {
    return browser.tabs
                  .query({ currentWindow: true, active: true })
                  .then(tabs => tabs[0]);
}
