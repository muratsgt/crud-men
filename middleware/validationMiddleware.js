const { check } = require('express-validator');

exports.categoryValidation = [
    check("title", "Title could be min 2 max 20 chars")
        .isLength({ min: 2, max: 20 }),
    check("description", "Description could be max 200 chars")
        .isLength({ max: 200 }),
];

exports.productValidation = [
    check("title", "Title could be min 2 max 100 chars")
        .isLength({ min: 2, max: 100 }),
    check("description", "Description could be max 5000 chars")
        .isLength({ max: 5000 }),
]