/*

*/
// Constraints for email/login/password
const constraints = {
    email: ['^[\\w\\.]+@([\\w\\-]+\\.)+[\\w\\-]{2,4}$', "A valid email structure like xyz@xyz.xyz"],
    login: ['^[a-zA-Z]{1,20}$', "Non-empty and less than 20 characters long"],
    password: ['^(?=.*[a-z])(?=.*[A-Z]).{6,}$', "At least 6 characters long and at least 1 uppercase letter and 1 lowercase letter"]
};

/**
 * A validate method for the form
 */
function validate() {
    let pass = true;
    // check email, 
    if (!checkEmail()) {
        // Set the flag to FALSE when check fails
        console.log("email check failed")
        pass = false;
    }

    // // check user name
    if (!checkUserName()) {
        // Set the flag to FALSE when check fails
        console.log("user name check failed")
        pass = false;
    }

    // check password
    if (!checkPassword()) {
        // Set the flag to FALSE when check fails
        console.log("password check failed")
        pass = false;
    }

    if (!checkTermsAndConditionsAcceptance()) {
        // Set the flag to FALSE when check fails
        console.log("checkbox of terms and conditions check failed")
        pass = false;
    }

    console.log("The final result of the form validate is " + pass)

    // transform the content to lower case if pass all form check
    if (pass) {
        const username = document.querySelector("#login");
        username.value = username.value.toLowerCase();
    }
    return pass;
}

/**
 * Email text box value is a valid email structure (xyx@xyz.xyz)
 */
function checkEmail() {

    let pass = true;
    const email = document.querySelector("#email");
    console.log("Email's current value is " + email.value)
    var constraint = new RegExp(constraints["email"][0], "");
    console.log("Email constraint is " + constraint);

    if (constraint.test(email.value)) {
        hideErrorMsg(email);
    } else {
        showErrorMsg(email, constraints["email"][1]);
        pass = false;
    }
    return pass;
}

/**
 * login name should be non-empty (do not use a required tag in HTML) and less than 20 characters long.
 * When you send this data (on successful validation) convert the login name to all lower-case alphabetic characters (you will confirm this in the get header)
 */
function checkUserName() {
    let pass = true;
    const login = document.querySelector("#login");
    console.log("User name's current value is " + login.value)
    var constraint = new RegExp(constraints["login"][0], "");
    console.log("User name constraint is " + constraint);

    if (constraint.test(login.value)) {
        hideErrorMsg(login);
    } else {
        showErrorMsg(login, constraints["login"][1]);
        pass = false;
    }
    return pass;
}

/**
 * Display error message
 */
function showErrorMsg(targetElement, errorMsg) {
    targetElement.classList.add("error");
    let msg = document.querySelector('.errmsg#err' + targetElement.id);
    if (!msg) {
        msg = document.createElement('span');
        msg.className = 'errmsg';
        msg.id = 'err' + targetElement.id;
        targetElement.insertAdjacentElement('afterend', msg);
    }
    msg.textContent = errorMsg;
    msg.style.marginLeft = "5px";
    msg.hidden = false;
}

/**
 * Hide error message
 */
function hideErrorMsg(targetElement) {
    targetElement.classList.remove("error");
    let msg = document.querySelector('.errmsg#err' + targetElement.id);
    // Do nothing if the element is not exist.
    if (!msg) {
        return;
    }
    msg.hidden = true;
}

/**
 * Hide all the error message
 */
function hideAllErrorMsg() {
    let elements = document.querySelectorAll(".error");
    elements.forEach(element => hideErrorMsg(element));
}

/**
 * Check password
 * 
 * password should be at least 6 characters long
 * password should have at least 1 uppercase letter and 1 lowercase letter
 * Ensure that both the password fields have the same value and are not blank
 */
function checkPassword() {
    let pass = true;
    const password = document.querySelector("#pass");
    const retypePassword = document.querySelector("#pass2");
    let passFlagPasswd = checkSinglePassword(password);
    let passFlagRetypePasswd = checkSinglePassword(retypePassword);
    if (passFlagPasswd && passFlagRetypePasswd) {

        if (password.value !== retypePassword.value) {
            pass = false;
            //when the two password is not match
            showErrorMsg(retypePassword, "Those passwords didn’t match")
        } else {
            hideErrorMsg(retypePassword);
        }

    } else {
        pass = false;
    }
    return pass;

}

/**
 * check password
 */
function checkSinglePassword(targetElement) {
    let pass = true;
    console.log("Password's current value is " + targetElement.value)
    var constraint = new RegExp(constraints["password"][0], "");
    console.log("Password constraint is " + constraint);

    if (constraint.test(targetElement.value)) {
        hideErrorMsg(targetElement);
    } else {
        showErrorMsg(targetElement, constraints["password"][1]);
        pass = false;
    }
    return pass;
}

/**
 * Check terms and conditions acceptance 
 * 
 * Ensure that the terms and conditions are accepted
 */
function checkTermsAndConditionsAcceptance() {
    const terms = document.querySelector("#terms");
    console.log("Terms acceptance validate:" + terms.checked);
    if (!terms.checked) {
        // if not agree the terms and conditions 
        showErrorMsg(terms.nextElementSibling, "Please accept the terms and conditions.");
    } else {
        hideErrorMsg(terms.nextElementSibling);
    }
    return !!terms.checked;
}

/**
 * If the user selects to receive a newsletter, immediately alert them about 
 * possible spam by setting an event on this field.
 */
window.onload = () => {
    // disable all the original validate provide by html5
    var forms = document.querySelectorAll('form');
    for (var i = 0; i < forms.length; i++) {
        forms[i].setAttribute('novalidate', true);
    }

    // When newsletter checked, the information will pop up immediately
    const checkbox = document.querySelector("#newsletter");
    checkbox.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
            alert('Be aware that you may receive potential spam email.');
        }
    })

    // when reset click, clear all the form data and error message
    const reset = document.querySelector("button[type=reset]")
    reset.addEventListener('click', (event) => {
        document.querySelector("form").reset();
        hideAllErrorMsg();
    })
}