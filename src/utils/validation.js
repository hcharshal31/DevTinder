const validator = require("validator");

const validateSignUpData = (body) => {
    const { firstName, lastName, emailId, password } = body;

    if (!firstName || !lastName) {
        throw new Error("Name is required");
    }

    if (!validator.isEmail(emailId)) {
        throw new Error("Invalid email format");
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough");
    }
};

const validateLoginData = body => {
    const {emailId, password} = body;
    if(!emailId || !password){
        throw new Error("Invalid credentials");
    }
    if (!validator.isEmail(emailId)) {
        throw new Error("Invalid email format");
    }
}

const validateEditProfileData = body =>{
    const fieldsAllowedToEdit = ["firstName", "lastName", "age", "gender", "photoURL"];

    const fieldToUpdate = Object.keys(body);

    if(fieldToUpdate.length === 0){
        return false;
    }

    const isValidUpdateOperation = fieldToUpdate.every(field => fieldsAllowedToEdit.includes(field))

    return isValidUpdateOperation;
}

module.exports = {
    validateSignUpData,
    validateLoginData,
    validateEditProfileData
}