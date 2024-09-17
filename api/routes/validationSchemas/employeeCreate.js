module.exports = createResourceValidationSchema = {
    firstname: {
        isLength: {
            options: {
                min: 1,
                max: 100,
            },
            errorMessage:
                "Username must be at least 1 character with a max of 100 characters",
        },
        notEmpty: {
            errorMessage: "name is required",
        },
        isString: {
            errorMessage: "name must be a string!",
        },
    },
    middlename: {
        isLength: {
            options: {
                max: 100,
            },
            errorMessage:
                "Username must be at least 1 character with a max of 100 characters",
        },
        isString: {
            errorMessage: "name must be a string!",
        },

    },
    lastname: {
        isLength: {
            options: {
                min: 1,
                max: 100,
            },
            errorMessage:
                "Username must be at least 1 character with a max of 100 characters",
        },
        notEmpty: {
            errorMessage: "name is required",
        },
        isString: {
            errorMessage: "name must be a string!",
        },
    },
    payrate: {
        isCurrency: {
            options: {
                symbol: '$',
                require_symbol: false
            },
        },
        notEmpty: {
            errorMessage: "payrate is required",
        }
    },
    department: {
        isInt: {
            errorMessage: "department must be an integer"
        }
    },
};