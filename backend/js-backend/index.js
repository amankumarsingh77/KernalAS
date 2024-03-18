const mongoose = require('mongoose');
const express = require('express');
const userRouter = require('./routes/user');
const cors = require('cors');
const app = express();
mongoose.connect("mongodb+srv://klh:Aman2004@cluster0.w7eb8ia.mongodb.net/Studies");
app.use(express.json());
app.use(cors());


app.use('/user', userRouter);

app.get('/home', (req, res) => {
    res.send("hello world");
    console.log("hello world");
})

app.listen(3000);