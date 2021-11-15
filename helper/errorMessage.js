/**
 * In order to have a structured error return
 * @param {(object)} res - response object
 * @param {(string | string[])} message - error message
 * @param {(number)} code - status code, default value 500
 * @returns {(json)} Error
 */

const errorMessage = (res, message, code = 500) => {
    if (typeof message == "string") {
        return res.status(code).json({ errors: [{ message: message }] });
    }
    else {
        return res.status(code).json({ errors: message });
    }
};

module.exports = errorMessage;