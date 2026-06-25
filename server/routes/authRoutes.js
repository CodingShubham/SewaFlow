const express = require('express');
const router = express.Router();
const { signup, login } = require('../Controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;