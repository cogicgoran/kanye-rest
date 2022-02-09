const form = document.querySelector(".js-login-form");

async function getUsers() {
    try {
        return await fetch("/users.json").then(res => res.json());
    }catch(error){
    }
}

function displayInvalidCredentialsError() {
    alert("Invalid credentials");
}

form.addEventListener("submit", async function(event){
    event.preventDefault();
    const email = document.querySelector(".js-input-email").value;
    const password = document.querySelector(".js-input-password").value;
    
    try {
        const users = await fetch("/users.json").then(res => res.json());
        const matchedUser = users.find(user => {
            return user.email === email && user.password === password;
        })
    
        if (matchedUser) {
            const storedItem = {email};
            localStorage.setItem('current-user', JSON.stringify(storedItem));
            window.location = "/index.html";
        } else {
            displayInvalidCredentialsError();
        }
    }catch(error) {
        alert("Error fetching users");
    }


});