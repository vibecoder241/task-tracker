const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
router.post('/register', async (req, res) => {
    try {
        const { name, email, password} = req.body;

        let user = await User.findOne({email});
        if (user) return res.status(400).send("User already Found!");

        const hashedpassword = await bcrypt.hash(password, 10);

        user = new User({
            name,
            email,
            password: hashedpassword
        });

        await user.save();

        res.status(200).json({message: 'User Registered'});

    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(500).send("Invalid credentials");

        const pwdMatch = await bcrypt.compare(password, user.password);
        if(!pwdMatch) return res.status(500).send("Invalid credentials");

        const token = jwt.sign(
            {userid: user._id},
            process.env.JWT_SECRET,
            { expiresIn: '1d'}
        );

        res.json({token});

    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports = router;