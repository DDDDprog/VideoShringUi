import { verifyToken } from '../utils/jwtUtils.js';

// JWT Authentication Middleware
export const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Expecting "Bearer <token>"

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
