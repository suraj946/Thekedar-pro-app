const validateName = (nameTxt, labelName="name") => {
    const nameRegx = /^[A-Za-z]+(?:[\s'-][A-Za-z]+)*$/;
    let response;
    if(nameTxt.length === 0){
        response = {
            isValid: false,
            errorText: `${labelName} is required`
        }
    }
    else if(nameTxt.length < 4){
        response = {
            isValid: false,
            errorText: `${labelName} is too small (min length 4 characters)`
        }
    }
    else if(!nameTxt.match(nameRegx)){
        response = {
            isValid: false,
            errorText: `Please enter valid ${labelName}`
        }
    }
    else{
        response={
            isValid:true,
            errorText:""
        }
    }
    return response;
}

const validateEmail = (email) => {
    const emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let response;
    if(email.length === 0){
        response = {
            isValid: false,
            errorText: "Email is required"
        }
    }
    else if(!email.match(emailRegx)){
        response = {
            isValid: false,
            errorText: "Please enter valid email address"
        }
    }
    else{
        response = {
            isValid: true,
            errorText:""
        }
    }
    return response;
}  

const validatePassword = (password) => {
    const passwordRegx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let response;
    if(password.length === 0){
        response = {
            isValid: false,
            errorText: "Password is required"
        }
    }
    else if(password.length < 8){
        response = {
            isValid: false,
            errorText: "Password must be 8 characters long"
        }
    }
    else if(!password.match(passwordRegx)){
        response = {
            isValid: false,
            errorText: "Password must contains alpha-numeric and special characters"
        }
    }
    else{
        response = {
            isValid: true,
            errorText:""
        }
    }
    return response;
}

const validateOtp = (otp) => {
    let response;
    if(otp?.trim().length === 0){
        response = {
            isValid: false,
            errorText: `OTP is required`
        }
    }
    else if(isNaN(otp)){
        response = {
            isValid: false,
            errorText: "Invalid otp"
        }
    }
    else if(otp?.trim().length !== 6){
        response = {
            isValid: false,
            errorText: "Otp cannot be more or less than 6 digits"
        }
    }
    else{
        response={
            isValid:true,
            errorText:""
        }
    }
    return response;
}

const validateWages = (wages) => {
    let response;
    if(wages?.trim().length === 0){
        response = {
            isValid: false,
            errorText: `Wages is required`
        }
    }
    else if(isNaN(wages)){
        response = {
            isValid: false,
            errorText: "Invalid wages, it should be a number"
        }
    }
    else{
        response={
            isValid:true,
            errorText:""
        }
    }
    return response;
}

const validatePhoneNumber = (number) => {
    let response;
    if(isNaN(number)){
        response = {
            isValid: false,
            errorText: "Invalid phone number"
        }
    }
    else if(number?.trim().length !== 10){
        response = {
            isValid: false,
            errorText: "phone number cannot be more or less than 10 digits"
        }
    }
    else{
        response={
            isValid:true,
            errorText:""
        }
    }
    return response;
}

const validateDayDate = (date) => {
    let response;
    if(date?.trim().length === 0){
        response = {
            isValid: false,
            errorText: `date is required`
        }
    }
    else if(isNaN(date)){
        response = {
            isValid: false,
            errorText: "Date should be a number"
        }
    }
    else if(Number(date) > 32 || Number(date) < 1){
        response = {
            isValid: false,
            errorText: "Invalid date given"
        }
    }
    else{
        response={
            isValid:true,
            errorText:""
        }
    }
    return response;
}

export {
    validateName,
    validateEmail,
    validatePassword,
    validateOtp,
    validateWages,
    validatePhoneNumber,
    validateDayDate
}