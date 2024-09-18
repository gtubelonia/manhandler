
module.exports = updatePhoneValidationSchema = {
    employeeid: {
        isInt: "employeeid must be an integer",
        optional: {
            options: {
                values: 'falsy',
            }
        },
    },
    countrycode: {
        isLength: {
            options: {
                min: 1,
                max: 100,
            },
            errorMessage:
                "countrycode must be at least 1 digit with a max of 100 digits",
        },
        isInt: {
            errorMessage: "countrycode must be an integer",
        },
        optional: {
            options: {
                values: 'falsy',
            }
        },
    },
    areacode: {
        optional: {
            options: {
                values: 'falsy',
            }
        },
        isInt: {
            errorMessage: "area code must be an integer",
        },
    },
    phonenumber: {
        optional: {
            options: {
                values: 'falsy',
            }
        },
        isString: {
            errorMessage: "phonenumber must be a string"
        }
    },
    phonetype: {
        optional: {
            options: {
                values: 'falsy',
            }
        },
        isInt: {
            errorMessage: "phonetype must be an integer"
        }
    }
};
