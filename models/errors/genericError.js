function genericError(
    res,
    code,
    message
) {
    return res.status(code).json({
        status: 'error',
        message,
    });
}

module.exports = {
    genericError
} 
