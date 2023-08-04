function UserExistsError(message) {
    const error = new Error(message);
    error.name = 'UserExistsError';
    return error;
}

function EmailExistsError(message) {
    const error = new Error(message);
    error.name = 'EmailExistsError';
    return error;
}
function UnauthorizedOperationError(message) {
    const error = new Error(message);
    error.name = 'UnauthorizedError';
    return error;
}

module.exports = {
    UserExistsError,
    EmailExistsError,
    UnauthorizedOperationError,
};
