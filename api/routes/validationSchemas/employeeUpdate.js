module.exports = updateResourceValidationSchema = {
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
        optional: {
            options: {
                values: 'falsy',
            }
        },
    },
    middlename: {
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
        optional: {
            options: {
                values: 'falsy',
            }
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
        optional: {
            options: {
                values: 'falsy',
            }
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
        },
        optional: {
            options: {
                values: 'falsy',
            }
        },
    },
    active: {
        isBoolean: {
            errorMessage: "active must be true or false"
        },
        optional: {
            options: {
                values: 'falsy',
            }
        }
    },
    department: {
        isInt: {
            errorMessage: "department must be an integer"
        },
        optional: {
            options: {
                values: 'falsy',
            }
        },
    },
    startdate: {
        isDate: {
            errorMessage: "startdate must be a date"
        },
        optional: {
            options: {
                values: 'falsy',
            }
        },
    },
    enddate: {
        isDate: {
            errorMessage: "enddate must be a date"
        },
        optional: {
            options: {
                values: 'falsy',
            }
        },
    },
    team: {
        isString: {
            errorMessage: "team must be a string"
        },
        optional: {
            options: {
                values: 'falsy',
            }
        },
    }
};