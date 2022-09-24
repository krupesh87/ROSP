import express from "express";
import cors from "cors";
import Connection from "./database/db.js";
import router from "./routes/routes.js";
import bodyParser from 'body-parser';
import users from './routes/users.js';
import PasswordReset from './routes/passwordReset.js';

const app = express()

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 8000

app.use('/api', router);
app.use('/api/users',users);
app.use('/api/password-reset',PasswordReset);

Connection();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:8000`)
})