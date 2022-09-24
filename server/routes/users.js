import express from 'express';
import { User } from '../model/user.js'
import Token from '../model/token.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fetchuser from '../middlewares/fetchuser.js';
import dotenv from 'dotenv';
import sendEmail from '../utils/sendEmail.js'
import crypto from 'crypto';

const router = express.Router();

dotenv.config();

const JWT_Secret = "Deepisagoodb$oy";

// Route 1: Create a User using Post "/api/users/createuser". Doesn't require Auth

router.post("/createuser", [
    body('username', 'Enter a Valid Name').isLength({ min: 3 }),
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Enter a valid Password').isLength({ min: 5 }),
], async (req, res) => {

    let success = false;

    // If there is an error return the bad request and the error

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // check whether the user with same email exists already.

    try {
        let user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).json({ success, error: "Sorry! a user with this username already exists." })
        }

        // Hashing the password

        const salt = await bcrypt.genSalt(10);

        const secPass = await bcrypt.hash(req.body.password, salt)

        // Create a new User

        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: secPass,
            active: false
        });


        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_Secret);

        // res.json(user);
        success = true

        user = await User.findOne({ username: req.body.username });

        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `http://localhost:8000/api/users/${user._id}/${token.token}`;
        await sendEmail(user.email, "Email Comfirmation", link);

        const message = "Email Confirmation Link send Successfully";

        res.json({ success, authtoken, message });
    } catch (e) {
        console.error(e.messsage);
        res.status(500).send("Internal Server Error");
    }
})

// Route 2: Activating User   api/users/:userId/:token

router.get("/:userId/:token", async (req, res) => {
    try {
        let user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        user.active = true;
        await user.save();
        await token.delete();

        res.redirect("http://localhost:3000/signin");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

// Route 3: Authenticate a User using POST  "/api/users/login". No Login required.

router.post("/login", [
    body('username', 'Enter a Valid Username').isLength({ min: 3 }),
    body('password', 'Password Cannot be blank').exists()
], async (req, res) => {

    let success = false;

    // If there is an error return the bad request and the error

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        if (!user.active) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_Secret);

        success = true

        res.json({ success, authtoken });
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal Server Error");
    }

})

// ROUTE 4: Get loggedin User Details using: POST "/api/users/getuser". Login required

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})


export default router;