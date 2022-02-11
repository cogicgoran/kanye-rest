const btnSignOut = document.querySelector('.js-btn-logout');

btnSignOut.addEventListener("click", function signOutClickHandler() {
    KanyeDatabase.removeCurrentUser();
    window.location.href = "/login.html";
});