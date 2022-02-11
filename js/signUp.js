const formRegister = document.querySelector(".form-register");

formRegister.addEventListener("submit", formRegisterSubmitHandler);
formRegister.addEventListener("focusin", formRegisterFocusInHandler);
////////////////////////////////////////////

function clearErrors() {
    document.querySelectorAll('.form-error-validator').forEach(el => el.remove());
}

function formRegisterFocusInHandler(event){
    clearErrors();
}

function formRegisterSubmitHandler(event){
    formRegister.querySelector('.form-register__btn-confirm').focus();

    event.preventDefault();
    const email = document.querySelector('.js-register-input-email').value;
    const password = document.querySelector('.js-register-input-password').value;
    const passwordConfirm = document.querySelector('.js-register-input-password-confirm').value;
    const users = KanyeDatabase.getUsers();
    
    try{
        // Will throw error if inputs are invalid
        validateInputs(email, password, passwordConfirm, users);
        users.push({email, password});
        KanyeDatabase.setCurrentUser(email);
        KanyeDatabase.setUsers(users);
        window.location.href = "/index.html";
    }catch(error){
        if(error.title !== 'form-validator') {
            alert(error.message)
        }
    }
}

function validateInputs(email, password, passwordConfirm, users){
    validateEmailExists(email, users);
    validatePassword(password);
    validateConfirmPassword(password, passwordConfirm);
}

function createValidatorError(locationElement, message) {
    const errorContainer = document.createElement('div');
    errorContainer.classList.add('form-error-validator');
    errorContainer.textContent = message;
    locationElement.append(errorContainer);
}

// TODO check if good enough
function validateEmailExists(email, users){
    const emailWrapper = document.querySelector('.js-register-email');
    const regExpSimpleEmail = /\S+@\S+\.\S+/;
    if (!regExpSimpleEmail.test(email)) {
        createValidatorError(emailWrapper, "Invalid email");
        throw {title:'form-validator'};
    }
    const matchingEmail = users.find(user => user.email === email);
    if ( matchingEmail ) {
        createValidatorError(emailWrapper, "Email already exists");
        throw {title:'form-validator'};
    };
}

function validatePassword(password){
    const passwordWrapper = document.querySelector('.js-register-password')
    if ( password.length < 8) {
        createValidatorError(passwordWrapper, 'Password must be at least 8 characters long')
        throw {title:'form-validator'};
    }

    const regExpCapitalLetter = /[A-Z]/;
    const regExpNumber = /\d/;

    if (!( regExpCapitalLetter.test(password) && regExpNumber.test(password) )) {
        createValidatorError(passwordWrapper, 'Password must contain at least one capital letter and at least one number')
        throw {title:'form-validator'};
    }
}

function validateConfirmPassword(password, passwordConfirm){
    const passwordConfirmContainer = document.querySelector('.js-register-password-confirm')
    if ( password !== passwordConfirm) {
        createValidatorError(passwordConfirmContainer, 'Passwords are not matching!')
        throw {title:'form-validator'};
    }
}
