const historyQuotesContainer = document.querySelector('.js-quote-history-container');

// Creates DOM element for each quote
// Each element displays quote, count, dateCreated, dateUpdated

let checkedQuotes = [];

function createCheckbox() {
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', "checkbox");
    checkBox.classList.add('js-report-checkbox');
    return checkBox;
}

function displayAll() {
    historyQuotesContainer.innerHTML = "";
    const quotesString = localStorage.getItem("quotes");
    const quotesStorage = JSON.parse(quotesString);

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

    if(quotesStorage && quotesStorage.length > 0 && !document.querySelector('.js-reports-select-all')){
        displayCheckboxSelectAll();
    }else if(( !quotesStorage || (quotesStorage.length === 0)) && document.querySelector('.js-reports-select-all')){
        removeCheckboxSelectAll();
    }
}

displayAll();

function removeCheckboxSelectAll(){
    document.querySelector('.js-reports-select-all').removeEventListener("change", checkboxSelectAllChangeHandler);
    document.querySelector('.js-reports-select-all-container').remove();
}

function displayCheckboxSelectAll(){
    const container = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const breakElement = document.createElement('br');

    container.classList.add('reports__select-all-container');
    container.classList.add('js-reports-select-all-container');
    label.setAttribute('for','reports-select-all');
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

function checkboxSelectAllChangeHandler(event){
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


// checkboxSelectAll.addEventListener("change", function (event) {
    
// });

{/* <div class="reports__select-all-container">
                <label for="reports-select-all">Select All</label>
                <br>
                <input class="reports__select-all js-reports-select-all" type="checkbox" name="reports-select-all">
            </div> */}


historyQuotesContainer.addEventListener("change", function (event) {
    const quoteId = event.target.closest(".history__quote").dataset.id;
    if (event.target.checked) {
        checkedQuotes.push(quoteId);
    } else {
        checkboxSelectAll.checked = false;
        checkedQuotes.splice(checkedQuotes.indexOf(checkedQuotes.find(id => quoteId === id)), 1);
    }
    updateDisplayRemoveButton();
})

function checkboxRemoveQuoteHandler() {
    document.querySelector('.js-reports-select-all').checked = false;
    const quotes = JSON.parse(localStorage.getItem('quotes'));
    checkedQuotes.forEach(checkedQuoteId => {
        const res = quotes.splice(quotes.indexOf(quotes.find(quote=>{
            return quote.id == checkedQuoteId;
        })),1);
    });

    localStorage.setItem("quotes", JSON.stringify(quotes));
    displayAll();
    checkedQuotes = [];
    const thisButton = document.querySelector('.js-btn-remove-quotes');
    thisButton.removeEventListener("click", checkboxRemoveQuoteHandler);
    thisButton.remove();
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
        button.addEventListener("click", checkboxRemoveQuoteHandler);
        buttonContainer.append(button);
    }
    button.innerHTML = `Remove Quotes <br> (${checkedQuotes
        .length} items selected)`;
}


localStorage.setItem('page-history-prev', "reports");