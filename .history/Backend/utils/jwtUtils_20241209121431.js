import jwt from 'jsonwebtoken';

// Generate JWT Token
export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Verify JWT Token (for future middleware usage)
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
