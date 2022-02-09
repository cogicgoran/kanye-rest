const form = document.querySelector(".js-login-form");

async function getUsers() {
    try {
        return await fetch("/users.json").then(res => res.json());
    }catch(error){
        alert("Error fetching users");
    }
}

function displayInvalidCredentialsError() {
    alert("Invalid credentials");
}

form.addEventListener("submit", async function(event){
    event.preventDefault();
    const email = document.querySelector(".js-input-email").value;
    const password = document.querySelector(".js-input-password").value;

    const users = await getUsers();

    const matchedUser = users.find(user => {
        return user.email === email && user.password === password;
    })

    if (matchedUser) {
        localStorage.setItem('current-user',`email=${email}`);
        window.location = "/index.html";
    } else {
        displayInvalidCredentialsError();
    }
});