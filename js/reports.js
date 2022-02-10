const historyQuotesContainer = document.querySelector('.js-quote-history-container');
const quotesString = localStorage.getItem("quotes");
const quotesStorage = JSON.parse(quotesString);

// Creates DOM element for each quote
// Each element displays quote, count, dateCreated, dateUpdated

let checkedQuotes = [];

function createCheckbox() {
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type',"checkbox");
    checkBox.classList.add('js-report-checkbox');
    return checkBox;
}

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


historyQuotesContainer.addEventListener("change", function (event) {
    const quoteId = event.target.closest(".history__quote").dataset.id;
    if (event.target.checked) {
        checkedQuotes.push(quoteId);
    } else {
        checkedQuotes.splice(checkedQuotes.indexOf(checkedQuotes.find(id => quoteId === id)), 1);
    }
    updateDisplayRemoveButton();
})

function updateDisplayRemoveButton(){
    var button = document.querySelector('.js-btn-remove-quotes');
    if( checkedQuotes.length === 0) {
        button.remove(button);
        return;
    }
    if( checkedQuotes.length === 1 && !button){
        const buttonContainer = document.querySelector('.js-quote-history-wrapper');
        button = document.createElement('button');
        button.classList.add("btn-remove-quotes");
        button.classList.add("js-btn-remove-quotes");
        console.log(button);
        buttonContainer.append(button);
    }
    button.innerHTML = `Remove Quotes <br> (${checkedQuotes
    .length} items selected)`;
}

localStorage.setItem('page-history-prev', "reports");