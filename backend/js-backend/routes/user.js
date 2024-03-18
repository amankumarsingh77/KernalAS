const express = require('express');
require('dotenv').config()
const path = require('path')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt');
const router = express.Router();
const { SECRET } = require('../config'); // Import SECRET correctly
const jwt = require("jsonwebtoken");
const { Users } = require('../db/modals');
const { authMiddleware } = require('../middleware/auth');



const transport = {
    //this is the authentication for sending email.
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    //create a .env file and define the process.env variables 
    // with your credentials.
    auth: {
        user: process.env.SMTP_TO_EMAIL,
        pass: process.env.SMTP_TO_PASSWORD,
    },
}


const transporter = nodemailer.createTransport(transport)
transporter.verify((error, success) => {
    if (error) {
        //if error happened code ends here
        console.error(error)
    } else {
        //this means success
        console.log('Ready to send mail!')
    }
})


router.post("/signup", async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    if (password.length > 20) {
        return res.status(400).json({ message: "Password length exceeds the maximum allowed length" });
    }

    try {
        const userExists = await Users.findOne({ $or: [{ username }, { email }] });
        if (userExists) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        const hash = await bcrypt.hash(password, 10);
        const user = new Users({ username, password: hash, email });
        await user.save();

        const token = jwt.sign({ username, email }, SECRET, { expiresIn: "24hrs" });
        res.json({ message: "User registered!", token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const user = await Users.findOne({ username, email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const result = await bcrypt.compare(password, user.password);
        if (result) {
            const token = jwt.sign({ username, email }, SECRET, { expiresIn: "1hr" });
            res.json({ message: "Logged in successfully!", token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/profile', authMiddleware, (req, res) => {
    try {
        const usert = req.user;
        res.json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.put('/updateprofile', authMiddleware, async (req, res) => {
    try {
        const { username, email } = req.body;
        const userId = req.user._id;


        const user = await Users.findById(userId);


        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        if (username) user.username = username;
        if (email) user.email = email;


        await user.save();


        res.json({ message: "Profile updated successfully", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/', (req, res, next) => {
    res.status(200).json({ msg: 'Working' })
})

router.post('/', (req, res, next) => {

    const mail = {
        from: process.env.SMTP_FROM_EMAIL,
        to: process.env.SMTP_TO_EMAIL,
        subject: 'New Contact Form Submission',
        text: `
     from:
          ${req.body.username}
    
          contact details
          email: ${req.body.email}
          phone: ${req.body.tel}
    
          message:
          ${req.body.message}`,
    }
    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                status: 'fail',
            })
        } else {
            res.json({
                status: 'success',
            })
        }
    })
})

router.post('/subscribe', async (req, res) => {
    const { subduser, title, price } = req.body;
    const userid = await Users.findOne({ email: subduser });
    console.log(userid);
    const result = await Users.updateOne(
        { email: subduser },
        { $set: { title, price } }
    );
    res.json({ message: "Works" });
})

router.use('/api', function (req, res) {
    res.set('Content-Type', 'application/json')
    res.send('{"message":"Hello from the custom server!"}')
})


router.use('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '/react- ui/build', 'index.html'))
})

module.exports = router;

