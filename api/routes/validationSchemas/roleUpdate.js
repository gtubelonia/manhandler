
module.exports = updateRoleValidationSchema = {
    name: {
        optional: {
            options: {
                values:'falsy',
            }
        },
        isLength: {
            options: {
                min: 1,
                max: 100,
            },
            errorMessage:
                "Username must be at least 1 character with a max of 100 characters",
        },
        isString: {
            errorMessage: "name must be a string!",
        },

    },
    description: {
        optional: {
            options: {
                values:'falsy',
            }
        },
        notEmpty: {
            errorMessage: "description is required"
        },
        isString: {
            errorMessage: "description must be a string!",
        },
    },
};
