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
            count:1,
            createdAt:new Date(),
            updatedAt:null
        };
        quotesStorage.push(newQuote);
    }
}

function handleNewQuotes(quotes){
    const quotesString = localStorage.getItem("quotes");
    const quotesStorage = JSON.parse(quotesString) || [];

    quotes.forEach(quote => {
        appendQuoteToDisplay(quote);
        updateStorage(quotesStorage, quote);
    });
    localStorage.setItem("quotes",JSON.stringify(quotesStorage));
}

function emptyQuotesContainer(){
    quotesContainer.innerHTML = "";
}

async function fetchTasks() {
    try {
        const quotes = await Promise.all(
            [
                fetch(url).then(res => res.json()),
                fetch(url).then(res => res.json()),
                fetch(url).then(res => res.json()),
                fetch(url).then(res => res.json()),
                fetch(url).then(res => res.json())
            ])
            emptyQuotesContainer()
            handleNewQuotes(quotes);
    } catch (error) {
        alert("Error fetching \n",error);
    }
}

fetchTasks();

btnFetchQuotes.addEventListener("click", fetchTasks);