const KanyeDatabase = {
    getUsers: function () {
        return JSON.parse(localStorage.getItem('users')) || [];
    },
    getQuotes: function () {
        return JSON.parse(localStorage.getItem("quotes")) || [];
    },
    getCurrentUser: function () {
        return JSON.parse(localStorage.getItem('current-user'));
    },
    getPageHistory: function () {
        return localStorage.getItem('page-history-prev');
    },
    getPreviousQuotes: function () {
        return JSON.parse(localStorage.getItem("previous-quotes")) || [];
    },
    findUserByEmailAndPassword: function (email, password) {
        return KanyeDatabase.getUsers().find(user => user.email === email && user.password === password);
    },
    setCurrentUser: function (email) {
        localStorage.setItem('current-user', JSON.stringify({ email }));
    },
    setUsers: function (users) {
        localStorage.setItem('users', JSON.stringify(users));
    },
    setQuotes: function (quotesStorage) {
        localStorage.setItem("quotes", JSON.stringify(quotesStorage));
    },
    setPreviousQuotes: function (quotes) {
        localStorage.setItem("previous-quotes", JSON.stringify(quotes));
    },
    setPageHistory: function (location) {
        localStorage.setItem('page-history-prev', location);
    },
    removeCurrentUser: function () {
        localStorage.removeItem('current-user');
    }
}


