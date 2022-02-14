const historyQuotesContainer = document.querySelector('.js-quote-history-container');
let checkedQuotes = [];
const checkboxSelectAll = document.querySelector(".js-reports-select-all");
const checkboxSelectAllContainer = document.querySelector('.js-reports-select-all-container');

KanyeDatabase.setPageHistory("reports");
displayAll();

checkboxSelectAll.addEventListener("change", checkboxSelectAllChangeHandler);
historyQuotesContainer.addEventListener("change", historyQuotesContainerCheckHandler);

///////////////////////////////////

function historyQuotesContainerCheckHandler(event) {
    const quoteId = event.target.closest(".history__quote").dataset.id;
    if (event.target.checked) {
        checkedQuotes.push(quoteId);
    } else {
        document.querySelector('.js-reports-select-all').checked = false;
        checkedQuotes.splice(checkedQuotes.indexOf(checkedQuotes.find(id => quoteId === id)), 1);
    }
    updateDisplayRemoveButton();
}

function createCheckbox() {
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', "checkbox");
    checkBox.classList.add('js-report-checkbox');
    return checkBox;
}

function displayAll() {
    historyQuotesContainer.innerHTML = "";
    const quotesStorage = KanyeDatabase.getQuotes();

    quotesStorage.forEach(quote => {
        const bodyElement = document.createElement('div');
        const countElement = document.createElement('div');
        const createdAtElement = document.createElement('div');
        const updatedAtElement = document.createElement('div');
        const timeToFetch = document.createElement('div');
        const checkbox = createCheckbox();
        const quoteWrapperElement = document.createElement('div');

        bodyElement.classList.add("quoted");
        bodyElement.textContent = quote.body;
        countElement.textContent = `Count: ${quote.count}`;
        createdAtElement.textContent = "Created At: " + new Date(quote.createdAt).toLocaleString();
        updatedAtElement.textContent = quote.updatedAt && "Updated At: " + new Date(quote.updatedAt).toLocaleString() || '';
        timeToFetch.textContent = "Time to Fetch: " + (quote.time ? `${quote.time}ms` : "Unknown");
        quoteWrapperElement.classList.add('history__quote');
        quoteWrapperElement.dataset.id = quote.id;
        quoteWrapperElement.append(bodyElement, countElement, createdAtElement, updatedAtElement, timeToFetch, checkbox);
        historyQuotesContainer.append(quoteWrapperElement);
    });

    if (quotesStorage && quotesStorage.length > 0 && !document.querySelector('.js-reports-select-all')) {
        checkboxSelectAllContainer.classList.remove("hidden");
    } else if ((!quotesStorage || (quotesStorage.length === 0)) && document.querySelector('.js-reports-select-all')) {
        checkboxSelectAllContainer.classList.add("hidden");
    }
}

function checkboxSelectAllChangeHandler(event) {
    const allCheckboxes = document.querySelectorAll(".js-report-checkbox");
    checkedQuotes = [];
    if (event.target.checked) {
        allCheckboxes.forEach(el => {
            el.checked = true;
            checkedQuotes.push(el.closest('.history__quote').dataset.id);
        });
        updateDisplayRemoveButton();
    } else {
        allCheckboxes.forEach(el => {
            el.checked = false;
        });
        updateDisplayRemoveButton();
    }
}

function btnRemoveQuotesClickHandler() {
    document.querySelector('.js-reports-select-all').checked = false;
    const quotes = KanyeDatabase.getQuotes();
    const last5Quotes = KanyeDatabase.getPreviousQuotes();
    checkedQuotes.forEach(checkedQuoteId => {
        quotes.splice(quotes.indexOf(quotes.find(quote => {
            return quote.id == checkedQuoteId;
        })), 1);
        const item = last5Quotes.find(item => {
            return item.id == checkedQuoteId;
        })
        const id = last5Quotes.indexOf(item);
        if (id !== -1) {
            last5Quotes.splice(id, 1);
            KanyeDatabase.setPreviousQuotes(last5Quotes);
        }
    });

    KanyeDatabase.setQuotes(quotes)
    displayAll();
    checkedQuotes = [];
    displayButton.classList.add("hidden");
}

const displayButton = document.querySelector('.js-btn-remove-quotes');
displayButton.addEventListener("click", btnRemoveQuotesClickHandler);

function updateDisplayRemoveButton() {
    if (checkedQuotes.length === 0) {
        displayButton.classList.add("hidden");
        return;
    }
    if (checkedQuotes.length > 0) {
        displayButton.classList.remove("hidden");
    }
    displayButton.innerHTML = `Remove Quotes <br> (${checkedQuotes
        .length} items selected)`;
}


