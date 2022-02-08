const historyQuotesContainer = document.querySelector('.js-quote-history-container');

const quotesString = localStorage.getItem("quotes");
const quotesStorage = JSON.parse(quotesString);


// Creates DOM element for each quote
// Each element displays quote, count, dateCreated, dateUpdated
quotesStorage.forEach(quote => {
    const bodyElement = document.createElement('div');
    const countElement = document.createElement('div');
    const createdAtElement = document.createElement('div');
    const updatedAtElement = document.createElement('div');
    const quoteWrapperElement = document.createElement('div');

    bodyElement.classList.add("quoted");
    bodyElement.textContent = quote.body;
    countElement.textContent = `Count: ${quote.count}`;
    createdAtElement.textContent = "Created At: " + new Date(quote.createdAt).toLocaleString();
    updatedAtElement.textContent = quote.updatedAt && "Updated At: " + new Date(quote.updatedAt).toLocaleString() || '';
    quoteWrapperElement.classList.add('history__quote');
    quoteWrapperElement.append(bodyElement,countElement,createdAtElement,updatedAtElement);
    historyQuotesContainer.append(quoteWrapperElement);
});


localStorage.setItem('page-history-prev',"reports");