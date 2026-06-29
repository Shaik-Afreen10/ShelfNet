const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.verifyAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Get the token from the header (e.g., "Bearer <token>")
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        // This message is for a missing token
        return res.status(401).send({ message: 'A token is required for authentication' });
    }

    try {
        // This verifies the token is valid AND not expired
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);

        // Now we check if the verified token has the 'admin' role
        if (decoded.role !== 'admin') {
            return res.status(403).send({ message: 'Access Denied: Admins only' });
        }

        // The token is valid and is an admin, let the request continue
        req.user = decoded; // Optional: pass user info to the next function
        next();

    } catch (err) {
        // This message is for an invalid or expired token
        return res.status(401).send({ message: 'Invalid or expired token' });
    }
};
exports.verifyUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'A token is required for authentication' });
    }

    try {
        // This just verifies the token is valid
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        
        // This adds the user's ID, email, and role to the request
        // so the 'getUserProfile' controller can use it.
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).send({ message: 'Invalid or expired token' });
    }
};