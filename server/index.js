import express from "express";
import cors from "cors";
import Connection from "./database/db.js";
import router from "./routes/routes.js";
import bodyParser from 'body-parser';
import users from './routes/users.js';
import PasswordReset from './routes/passwordReset.js';
import { contactEmail } from './utils/contactEmail.js'

const app = express()

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 8000

app.use('/api', router);
app.use('/api/users',users);
app.use('/api/password-reset',PasswordReset);
app.post("/api/contact", async(req, res) => {
    try {
        let name = req.body.name;
        let email = req.body.email;
        let Message = req.body.Message;

        await contactEmail(name, email, Message)
        return res.status(200).json("message has received and we will get in touch with you soon")

    } catch (error) {
        console.log("Error", error)
        return res.status(500).json(error)
    }

})

Connection();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:8000`)
})