const formRegister = document.querySelector(".form-register");
const exampleDate = [{email:'a', password:'a'}]
const users = JSON.parse(localStorage.getItem('users')) || [];

formRegister.addEventListener("submit", formRegisterSubmitHandler);

function formRegisterSubmitHandler(event){
    event.preventDefault();
    
    const email = document.querySelector('.js-register-input-email').value;
    const password = document.querySelector('.js-register-input-password').value;
    const passwordConfirm = document.querySelector('.js-register-input-password-confirm').value;
    
    try{
        // Will throw error if inputs are invalid
        validateInputs(email, password, passwordConfirm);
        users.push({email, password});
        localStorage.setItem('users', JSON.stringify(users));
        
    }catch(error){
        alert(error.message);
    }
    
}

function validateInputs(email, password, passwordConfirm){
    validateEmailExists(email);
    validatePassword(password);
    validateConfirmPassword(password, passwordConfirm);
}

// TODO check if good enough
function validateEmailExists(email){
    const regExpSimpleEmail = /\S+@\S+\.\S+/;
    if (!regExpSimpleEmail.test(email)) {
        throw new Error("Invalid email");
    }
    const matchingEmail = users.find(user => user.email === email);
    if ( matchingEmail ) {
        throw new Error("Email already exists");
    };
}

function validatePassword(password){
    if ( password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
    }

    const regExpCapitalLetter = /[A-Z]/;
    const regExpNumber = /\d/;

    if (!( regExpCapitalLetter.test(password) && regExpNumber.test(password) )) {
        throw new Error("Password must contain at least one capital letter and at least one number");
    }
}

function validateConfirmPassword(password, passwordConfirm){
    if ( password !== passwordConfirm) {
        throw new Error("Passwords are not matching!");
    }
}
