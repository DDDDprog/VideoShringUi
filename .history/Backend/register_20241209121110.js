import express from 'express';
import bcrypt from 'bcryptjs';
import User from './models/User.js'; // Import User model

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the email is already taken
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.log('Error registering user:', err);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
});

export default router;
