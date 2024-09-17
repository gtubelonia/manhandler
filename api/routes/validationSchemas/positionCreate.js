
module.exports = createPositionValidationSchema = {
    name: {
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
    description: {
        notEmpty: {
            errorMessage: "description is required"
        },
        isString: {
            errorMessage: "description must be a string!",
        },
    },
    basepayrate: {
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
};

