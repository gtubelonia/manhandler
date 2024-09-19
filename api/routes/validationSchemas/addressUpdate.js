
module.exports = updateAddressValidationSchema = {
    address1: {
        optional: {
            options: {
                values: 'falsy',
            }
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
        optional: {
            options: {
                values: 'falsy',
            }
        },
        isString: {
            errorMessage: "city must be a string"
        }
    },
    state: {
        optional: {
            options: {
                values: 'falsy',
            }
        },
        isString: {
            errorMessage: "state must be a string"
        }
    },
    zipcode: {
        optional: {
            options: {
                values: 'falsy',
            }
        },
        isString: {
            errorMessage: "zipcode must be a string"
        }
    },
};