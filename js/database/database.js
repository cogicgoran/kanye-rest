const KanyeDatabase = {
    getUsers: function () {
        return JSON.parse(localStorage.getItem('users')) || [];
    },
    findUserByEmailAndPassword: function (email, password) {
        return KanyeDatabase.getUsers().find(user => user.email === email && user.password === password);
    },
    getCurrentUser: function() {
        return JSON.parse(localStorage.getItem('current-user'));
    },
    setCurrentUser: function(email) {
        localStorage.setItem('current-user', JSON.stringify({email}));
    },
    getQuotes: function(){
        return JSON.parse(localStorage.getItem("quotes")) || [];
    },
    setQuotes: function(quotesStorage) {
        localStorage.setItem("quotes", JSON.stringify(quotesStorage));
    },
    getPreviousQuotes: function() {
        return JSON.parse(localStorage.getItem("previous-quotes")) || [];
    },
    setPreviousQuotes: function(quotes){
        localStorage.setItem("previous-quotes", JSON.stringify(quotes));
    },
    getPageHistory: function() {
        return localStorage.getItem('page-history-prev');
    }
}


