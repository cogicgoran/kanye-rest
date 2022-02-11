const form = document.querySelector(".js-login-form");

function displayInvalidCredentialsError() {
    alert("Invalid credentials");
}

form.addEventListener("submit", async function authenticateUser(event) {
    event.preventDefault();
    const email = document.querySelector(".js-input-email").value;
    const password = document.querySelector(".js-input-password").value;

    try {
        const matchedUser = KanyeDatabase.findUserByEmailAndPassword(email, password);
        if (matchedUser) {
            KanyeDatabase.setCurrentUser(email);
            window.location = "/index.html";
        } else {
            displayInvalidCredentialsError();
        }
    } catch (error) {
        alert("Error fetching users");
    }
});