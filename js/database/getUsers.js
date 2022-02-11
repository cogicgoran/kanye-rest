const KanyeDatabase = {
    getUsers: function () {
        console.log("in get users");
        return JSON.parse(localStorage.getItem('users')) || [];
    },
    findUserByEmailAndPassword: function (email, password) {
        console.log("in email and password")
        return KanyeDatabase.getUsers().find(user => user.email === email && user.password === password);
    }
}


