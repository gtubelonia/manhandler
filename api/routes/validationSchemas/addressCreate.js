
module.exports = createAddressValidationSchema = {
    address1: {
        notEmpty: {
            errorMessage: "address1 is required"
        },
        isString: {
            errorMessage: "address1 must be a string",
        },
    },
    address2: {
        optional: {
            options: {
                values: 'falsy',
            }
        },
        isString: {
            errorMessage: "address2 must be a string"
        }
    },
    city: {
        notEmpty: {
            errorMessage: "city is required"
        },
        isString: {
            errorMessage: "city must be a string"
        }
    },
    state: {
        notEmpty: {
            errorMessage: "state is required"
        },
        isString: {
            errorMessage: "state must be a string"
        }
    },
    zipcode: {
        notEmpty: {
            errorMessage: "zipcode is required"
        },
        isString: {
            errorMessage: "zipcode must be a string"
        }
    },
};

