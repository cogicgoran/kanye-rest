const quotesContainer = document.querySelector('.js-quotes-container');
const btnFetchQuotes = document.querySelector('.js-fetch-quotes');
const url = 'https://api.kanye.rest/';

function appendQuoteToDisplay(quote) {
    const quoteElement = document.createElement('div');
    quoteElement.textContent = quote.quote;
    quotesContainer.append(quoteElement);
}

function updateStorage(quotesStorage, quote) {
    const matchedQuote = quotesStorage.find(storedQuote => {
        return storedQuote.body === quote.quote;
    });
    if (matchedQuote) {
        matchedQuote.count = matchedQuote.count + 1;
        matchedQuote.updatedAt = new Date()
    } else {
        const newQuote = {
            body: quote.quote,
            count: 1,
            createdAt: new Date(),
            updatedAt: null,
            time: quote.time
        };
        quotesStorage.push(newQuote);
    }
}

function updatePrevQuotes(quotes) {
    localStorage.setItem("previous-quotes", JSON.stringify(quotes));
}

// Keeps count on how many promises have finished from a single batch.
let fetchCounter = 0;
let fetchQuotes = [];


function handleNewQuotes(quote) {
    const quotesString = localStorage.getItem("quotes");
    const quotesStorage = JSON.parse(quotesString) || [];

    appendQuoteToDisplay(quote);
    updateStorage(quotesStorage, quote);
    fetchQuotes.push(quote);
    fetchCounter++;
    if (fetchCounter === 5) {
        updatePrevQuotes(fetchQuotes);
        fetchQuotes = [];
        fetchCounter = 0;
    }
    localStorage.setItem("quotes", JSON.stringify(quotesStorage));
}

function getPromiseArray() {
    const promiseArray = [];
    for (let i = 0; i < 5; i++) {
        promiseArray.push(fetch(url).then(res => res.json()))
    };
    return promiseArray
}

async function fetchTasks() {
    quotesContainer.innerHTML = "";
    try {
        for (let i = 0; i < 5; i++) {
            const timeBefore = Date.now()
            const res = await fetch(url);
            const data = await res.json();
            data.time = Date.now() - timeBefore;
            handleNewQuotes(data)
        };
    }
    catch (error) {
        alert(error);
    }

}

// Displays previous 5 quotes if this page was navigated from reports
// Otherwise fetches 5 new quotes
if (localStorage.getItem('page-history-prev') === 'reports') {
    quotesContainer.innerHTML = "";
    const previousQuotesString = localStorage.getItem("previous-quotes");
    if (previousQuotesString) {
        const previousQuotes = JSON.parse(previousQuotesString);
        previousQuotes.forEach(quote => {
            appendQuoteToDisplay(quote);
        })
    }
} else {
    // By the time window.location is changed if user is unauthenticated, function fetchTask will be triggered
    // Additional check to avoid sending that http request
    if (localStorage.getItem("current-user")) {
        fetchTasks();
    }
}

btnFetchQuotes.addEventListener("click", fetchTasks);
localStorage.setItem('page-history-prev', "home");
