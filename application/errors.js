function UserExistError(message) {
    const error = new Error(message);
    error.name = 'UserExistError';
    return error;
}

function EmailExistError(message) {
    const error = new Error(message);
    error.name = 'EmailExistError';
    return error;
}

module.exports = {
    UserExistError,
    EmailExistError
}