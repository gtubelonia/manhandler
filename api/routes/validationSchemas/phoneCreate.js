
module.exports = createPhoneValidationSchema = {
    countrycode: {
        isLength: {
            options: {
                min: 1,
                max: 100,
            },
            errorMessage:
                "countrycode must be at least 1 digit with a max of 100 digits",
        },
        notEmpty: {
            errorMessage: "countrycode is required",
        },
        isInt: {
            errorMessage: "countrycode must be an integer",
        },
    },
    areacode: {
        notEmpty: {
            errorMessage: "areacode is required"
        },
        isInt: {
            errorMessage: "areacode must be an integer",
        },
    },
    phonenumber:{
        notEmpty: {
            errorMessage: "phonenumber is required"
        },
        isString:{
            //TODO use custom function and regex ([\s.-]?\d{3}[\s.-]?\d{4}$) to validate as an 8-digit phone number
            errorMessage: "phonenumber is required"
        }
    },
    phonetype:{
        isInt:{
            errorMessage: "phonetype must be an integer"
        }
    }
};

