const jwt = require('jsonwebtoken');
const appError = require('../utils/appError');
const httpStatusText = require('../utils/http.Status.Text');

const verifyToken = (req, res, next) => {
    // Check for token in the Authorization header
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if (!authHeader) {
        const error = appError.create('Token is required', 401, httpStatusText.ERROR);
        return next(error);
    }

    // Extract the token from the Authorization header (Bearer token format)
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token using the secret key
        const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.currentUser = currentUser;
        next();
    } catch (err) {
        const error = appError.create('Invalid or expired token', 401, httpStatusText.ERROR);
        return next(error);
    }
};

module.exports = verifyToken;
