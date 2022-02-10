const form = document.querySelector(".js-login-form");

function displayInvalidCredentialsError() {
    alert("Invalid credentials");
}

form.addEventListener("submit", async function authenticateUser(event) {
    event.preventDefault();
    const email = document.querySelector(".js-input-email").value;
    const password = document.querySelector(".js-input-password").value;

    try {
        const users = await fetch("../database/users.json").then(res => res.json());
        const matchedUser = users.find(user => user.email === email && user.password === password);

        if (matchedUser) {
            const storedItem = { email };
            localStorage.setItem('current-user', JSON.stringify(storedItem));
            window.location = "/index.html";
        } else {
            displayInvalidCredentialsError();
        }
    } catch (error) {
        alert("Error fetching users");
    }
});