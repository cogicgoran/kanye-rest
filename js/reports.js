const historyQuotesContainer = document.querySelector('.js-quote-history-container');
let checkedQuotes = [];

localStorage.setItem('page-history-prev', "reports");
displayAll();

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
    const quotesStorage = JSON.parse(localStorage.getItem("quotes"));

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
        timeToFetch.textContent = `Time to Fetch: ${quote.time}ms`
        quoteWrapperElement.classList.add('history__quote');
        quoteWrapperElement.dataset.id = quote.id;
        quoteWrapperElement.append(bodyElement, countElement, createdAtElement, updatedAtElement, timeToFetch, checkbox);
        historyQuotesContainer.append(quoteWrapperElement);
    });

    if (quotesStorage && quotesStorage.length > 0 && !document.querySelector('.js-reports-select-all')) {
        displayCheckboxSelectAll();
    } else if ((!quotesStorage || (quotesStorage.length === 0)) && document.querySelector('.js-reports-select-all')) {
        removeCheckboxSelectAll();
    }
}

function removeCheckboxSelectAll() {
    document.querySelector('.js-reports-select-all').removeEventListener("change", checkboxSelectAllChangeHandler);
    document.querySelector('.js-reports-select-all-container').remove();
}

function displayCheckboxSelectAll() {
    const container = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const breakElement = document.createElement('br');

    container.classList.add('reports__select-all-container');
    container.classList.add('js-reports-select-all-container');
    label.setAttribute('for', 'reports-select-all');
    label.textContent = 'Select All';
    input.classList.add('reports__select-all');
    input.classList.add('js-reports-select-all');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('name', 'reports-select-all');

    input.addEventListener("change", checkboxSelectAllChangeHandler)

    container.append(label, breakElement, input);
    const checkboxWrapper = document.querySelector('.js-quote-history-wrapper');
    checkboxWrapper.append(container);
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
    const quotes = JSON.parse(localStorage.getItem('quotes'));
    checkedQuotes.forEach(checkedQuoteId => {
        quotes.splice(quotes.indexOf(quotes.find(quote => {
            return quote.id == checkedQuoteId;
        })), 1);
    });

    localStorage.setItem("quotes", JSON.stringify(quotes));
    displayAll();
    checkedQuotes = [];
    const btnRemoveQuotes = document.querySelector('.js-btn-remove-quotes');
    btnRemoveQuotes.removeEventListener("click", btnRemoveQuotesClickHandler);
    btnRemoveQuotes.remove();
}

function updateDisplayRemoveButton() {
    var button = document.querySelector('.js-btn-remove-quotes');
    if (checkedQuotes.length === 0) {
        button.remove(button);
        return;
    }
    if (checkedQuotes.length > 0 && !button) {
        const buttonContainer = document.querySelector('.js-quote-history-wrapper');
        button = document.createElement('button');
        button.classList.add("btn-remove-quotes");
        button.classList.add("js-btn-remove-quotes");
        button.addEventListener("click", btnRemoveQuotesClickHandler);
        buttonContainer.append(button);
    }
    button.innerHTML = `Remove Quotes <br> (${checkedQuotes
        .length} items selected)`;
}


