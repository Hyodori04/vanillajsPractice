const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2= document.querySelector('#password2');

const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small');
    small.innerText= message;
}

const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success'
}

const checkEmail = (input) => {
    const re = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    
    if(re.test(String(input.value.trim()).toLowerCase())) {
        showSuccess(input)
    }else {
        showError(input, `Email is not valid`);
    }

}

const checkRequired = (inputArr) => {
    let check = []
    // return correct [name, email, password, password2]
    inputArr.forEach((input)=> {
        if(input.value.trim() === ""){
            check.push(false)
            showError(input, `${getFieldName(input)} is required`);
        } else {
            check.push(true)
            showSuccess(input)
        }
    }) 
    return check;
}

const checkLength = (input, min, max) => {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    }else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    }else {
        showSuccess(input)
    }
};

const checkPasswordMatch = (input1, input2) => {
    if (input1.value !== input2.value) {
        showError(input2, "Passwords do not match")
    }
}
const getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


form.addEventListener('submit', function(e) {
    e.preventDefault();
    const [usernameE, emailE, passwordE, password2E] = checkRequired([username, email, password, password2]);
    usernameE && checkLength(username, 3, 15);
    passwordE && checkLength(password, 6, 25)
    emailE && checkEmail(email);
    password2 && checkPasswordMatch(password, password2);
    
})

console.log('hh') 