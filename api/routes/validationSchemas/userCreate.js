
module.exports = createUserValidationSchema = {
    username: {
        isLength: {
            options: {
                min: 1,
                max: 32,
            },
            errorMessage:
                "Username must be at least 1 character with a max of 32 characters",
        },
        notEmpty: {
            errorMessage: "Username is required",
        },
        isString: {
            errorMessage: "Username must be a string!",
        },
    },
    email: {
        notEmpty: {
            errorMessage: "email is required"
        },
        isEmail: {
            errorMessage: "Please enter a valid email"
        }
    },
    password: {
        notEmpty: {
            errorMessage: "Password is required"
        },
        isAlphanumeric: true
    },
};

