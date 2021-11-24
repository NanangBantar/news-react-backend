const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { v4: uuidv4 } = require('uuid');
const User = require("../../model/User");

router.post("/login", [
    check("email").isEmail(),
    check("passwordText").not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, passwordText } = req.body;
        let user = await User.findOne({
            email
        });

        if (user) {
            const isMatch = await bcryptjs.compare(passwordText, user.password);

            if (isMatch) {
                const payload = {
                    email: user.email,
                };

                const token = jwt.sign(payload, process.env.ACCESS_TOKEN);
                return res.json({
                    status: "success",
                    msg: "Login success..!",
                    token
                });
            }

            return res.json({
                status: "failed",
                msg: "Wrong email or password..!"
            });
        }

        return res.json({
            status: "failed",
            msg: "User doesn't exist..!"
        });
    } catch (error) {
        console.log(error);
        return res.json({
            status: "failed",
            msg: "Server error..!"
        });
    }
});

router.post("/createaccount", [
    check("firstname").not().isEmpty(),
    check("lastname").not().isEmpty(),
    check("gender").not().isEmpty(),
    check("city").not().isEmpty(),
    check("country").not().isEmpty(),
    check("email").isEmail(),
    check("passwordText").not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { firstname, lastname, gender, city, country, email, passwordText } = req.body;
        const salt = await bcryptjs.genSalt(10);
        const password = await bcryptjs.hash(passwordText, salt);

        let user = await User.findOne({
            email
        });

        if (!user) {
            user = new User({
                id: uuidv4(),
                firstname,
                lastname,
                gender,
                city,
                country,
                email,
                passwordText,
                password
            });

            await user.save();

            return res.json({
                status: "success",
                msg: "New user has been created..!"
            });
        }

        return res.json({
            status: "failed",
            msg: "Email has been used..!"
        });
    } catch (error) {
        console.log(error);
        return res.json({
            status: "failed",
            msg: "Server error..!"
        });
    }
});

module.exports = router;