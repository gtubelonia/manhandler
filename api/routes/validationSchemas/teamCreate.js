
module.exports = createDepartmentValidationSchema = {
    name: {
        isLength: {
            options: {
                min: 1,
                max: 100,
            },
            errorMessage:
                "name must be at least 1 character with a max of 100 characters",
        },
        isString: {
            errorMessage: "name must be a string!",
        },
        notEmpty: {
            errorMessage: "name is required"
        },
    },
    lead: {
        optional: {
            options: {
                values: 'falsy',
            }
        },
        isNumeric: {
            errorMessage: "lead must be a number",
        },
    },
};