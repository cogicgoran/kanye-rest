const btnSignOut = document.querySelector('.js-btn-logout');

btnSignOut.addEventListener("click", function signOutClickHandler(){
    localStorage.removeItem('current-user');
    window.location.href = "/login.html";
});