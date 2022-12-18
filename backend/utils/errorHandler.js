exports.genrateError = (errorMessage, errorCode) => {
    const error = new Error(errorMessage);
    error.status = errorCode;
    return error;
}

exports.statusCodes = {
    'OK': 200,
    'Created': 201,
    'Non_Authorization_Information': 203,
    'Bad_Request': 400,
    'Unauthorized': 401,
    'Forbidden': 403,
    'Not_Found': 404,
    'Internal_Server_Error': 500
}