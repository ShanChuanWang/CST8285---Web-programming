let inputDivs = document.querySelectorAll(".textfield");

let emailInput = document.querySelector("#email");
let loginInput = document.querySelector("#login");
let passInput = document.querySelector("#pass");
let passInput2 = document.querySelector("#pass2");
let newsLetter = document.querySelector("#newsletter");
let termInput = document.querySelector("#terms");

// create paragraph to display the error Msg returented by vaildateEmail() function 
// and assign this paragraph to the class warning to style the error MSg
let emailError = document.createElement('p');
emailError.setAttribute("class", "warning");
let loginError = document.createElement('p');
loginError.setAttribute("class","warning");
let passError = document.createElement('p');
passError.setAttribute("class","warning");
let pass2Error = document.createElement('p');
pass2Error.setAttribute("class","warning");
// append the created elements to the parent of email div
inputDivs[0].append(emailError);
inputDivs[1].append(loginError);
inputDivs[2].append(passError);
inputDivs[3].append(pass2Error);

let newsletterWarning = document.createElement('p');
let termsError = document.createElement('p');
newsletterWarning.setAttribute("class","warning");
termsError.setAttribute("class","warning");
document.querySelectorAll(".checkbox")[0].append(newsletterWarning);
document.querySelectorAll(".checkbox")[1].append(termsError);
// define global variables
let defaultMsg = "";
let emailErrorMsg = "Please enter a valid email";
let loginErrorMsg1 = "Please enter your login name";
let loginErrorMsg2 = "The login name must be less than 20 characters long";
let passErrorMsg = "Your password should be at least 1 uppercase letter, 1 lowercase letter and 6 characters long";
let pass2ErrorMsg = "Passwords are not the same";
let newsletterWarningMsg = "possible spam by setting an event on this field";
let termsErrorMsg = "Terms must be checked";

function vaildateEmail() {
    let email = emailInput.value; // access the value of the email
    let regexp = /\S+@\S+\.\S+/; // regulare expresson
    if(regexp.test(email)) { // test is predefiend method to check if the entered email matches the regexp
        error = defaultMsg;
    } else {
        error = emailErrorMsg;
    }
    return error;
}

/*
When you send this data (on successful validation) 
convert the login name to all lower-case alphabetic characters 
(you will confirm this in the get header)
*/
function validateLogin(){
    let login = loginInput.value;
    if (login == '') {
        error = loginErrorMsg1;
    } else if (login.length > 20) {
        error = loginErrorMsg2
    } else {
        error = defaultMsg;
    }
    return error;
}

function validatePass1() {
    let password = passInput.value;
    let regexp = /^(?=.*[a-z])(?=.*[A-Z])[^]{6,}$/;
    if (regexp.test(password)) {
        error = defaultMsg;
    } else {
        error = passErrorMsg;
    }
    return error;
}

function validatePass2() {
    let password = passInput.value;
    let retypePassword = passInput2.value;
    if (password === retypePassword) {
        error = defaultMsg;
    } else {
        error = pass2ErrorMsg;
    }
    return error;
}

function validateNewsLetter() {
    if (newsLetter.checked) {
        return newsletterWarningMsg;
    } else {
        return defaultMsg;
    }
}

function validatTerms() {
    if (termInput.checked) {
        return defaultMsg;
    } else {
        return termsErrorMsg;
    }
}

function validate(){
    let valid = true;
    let emailValidation = vaildateEmail();
    let loginValidation = validateLogin();
    let passValidaton1 = validatePass1();
    let passValidaton2 = validatePass2();
    let newsLetterValidation = validateNewsLetter();
    let termsValidation = validatTerms();

    
    if (emailValidation !== defaultMsg) {
        emailError.textContent = emailValidation;
        valid = false;
    }

    if (loginValidation !== defaultMsg) {
        loginError.textContent = loginValidation;
        valid = false;
    }

    if (passValidaton1 !== defaultMsg) {
        passError.textContent = passValidaton1;
        valid = false;
    }

    if (passValidaton2 !== defaultMsg) {
        pass2Error.textContent = passValidaton2;
        valid = false;
    }

    if(newsLetterValidation !== defaultMsg){ 
        newsletterWarning.textContent = newsLetterValidation;
        valid = false;
    }

    if(termsValidation !== defaultMsg){
        termsError.textContent=termsValidation;
        valid = false;
    }
    return valid;
};

function resetFormError() {
    emailError.textContent = defaultMsg;
    loginError.textContent = defaultMsg;
    passError.textContent = defaultMsg;
    pass2Error.textContent = defaultMsg;
    newsletterWarning.textContent = defaultMsg;
    termsError.textContent = defaultMsg;
}
document.form.addEventListener("reset",resetFormError);

emailInput.addEventListener("blur",()=>{ // arrow function
    let x = vaildateEmail();
    if(x == defaultMsg){
        emailError.textContent = defaultMsg;
    }
    });
// add event listner to the checkbox if you check the terms box,the error paragraph with be empty

    newsLetter.addEventListener("change", function(){// anonymous function
        if(this.checked == false){
            newsletterWarning.textContent = defaultMsg;
        }
        })
    
    termInput.addEventListener("change", function(){// anonymous function
        if(this.checked){
            termsError.textContent= defaultMsg;
        }
        });


// const divs = document.querySelectorAll("div");
// divs.forEach(div => {
//     div.addEventListener("click", () ==> {
//         console.log("Hi");
//     })
// });