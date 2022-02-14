const formRegister = document.querySelector(".form-register");

formRegister.addEventListener("submit", formRegisterSubmitHandler);
formRegister.addEventListener("focusin", formRegisterFocusInHandler);
////////////////////////////////////////////

function formRegisterFocusInHandler(event) {
    if ( event.target.tagName === 'INPUT'){
        document.querySelectorAll('.form-error-validator').forEach(el => el.remove());
    }
}

function formRegisterSubmitHandler(event) {
    // Focused to button to take focus away from inputs, so that validation errors would display correctly
    document.querySelectorAll('.form-error-validator').forEach(el => el.remove());
    formRegister.querySelector('.form-register__btn-confirm').focus();

    event.preventDefault();
    const email = document.querySelector('.js-register-input-email').value;
    const password = document.querySelector('.js-register-input-password').value;
    const passwordConfirm = document.querySelector('.js-register-input-password-confirm').value;
    const users = KanyeDatabase.getUsers();
    const errors = {};
    errors.isError = false;
    const setIsErrorTrue = () => errors.isError = true;

    try {
        // Will throw error if inputs are invalid
        validateInputs(email, password, passwordConfirm, users, setIsErrorTrue);
        if(errors.isError) throw {title:"form-validator"}
        users.push({ email, password });
        KanyeDatabase.setCurrentUser(email);
        KanyeDatabase.setUsers(users);
        window.location.href = "/index.html";
    } catch (error) {
        if (error.title !== 'form-validator') {
            alert(error.message)
        }
    }
}

function validateInputs(email, password, passwordConfirm, users, setIsErrorTrue) {
    validateEmailExists(email, users, setIsErrorTrue);
    validatePassword(password, setIsErrorTrue);
    validateConfirmPassword(password, passwordConfirm, setIsErrorTrue);
}

function createValidatorError(locationElement, message) {
    const errorContainer = document.createElement('div');
    errorContainer.classList.add('form-error-validator');
    errorContainer.textContent = message;
    locationElement.append(errorContainer);
}

// TODO check if good enough
function validateEmailExists(email, users, setIsErrorTrue) {
    const emailWrapper = document.querySelector('.js-register-email');
    const regExpSimpleEmail = /\S+@\S+\.\S+/;
    if (!regExpSimpleEmail.test(email)) {
        createValidatorError(emailWrapper, "Invalid email");
        setIsErrorTrue();
    }
    const matchingEmail = users.find(user => user.email === email);
    if (matchingEmail) {
        createValidatorError(emailWrapper, "Email already exists");
        setIsErrorTrue();
    };
}

function validatePassword(password, setIsErrorTrue) {
    const passwordWrapper = document.querySelector('.js-register-password')
    if (password.length < 8) {
        createValidatorError(passwordWrapper, 'Password must be at least 8 characters long')
        setIsErrorTrue();
    }

    const regExpCapitalLetter = /[A-Z]/;
    const regExpNumber = /\d/;

    if (!(regExpCapitalLetter.test(password) && regExpNumber.test(password))) {
        createValidatorError(passwordWrapper, 'Password must contain at least one capital letter and at least one number')
        setIsErrorTrue();
    }
}

function validateConfirmPassword(password, passwordConfirm, setIsErrorTrue) {
    const passwordConfirmContainer = document.querySelector('.js-register-password-confirm');
    if (password !== passwordConfirm) {
        createValidatorError(passwordConfirmContainer, 'Passwords are not matching!')
        setIsErrorTrue();
    }
}
