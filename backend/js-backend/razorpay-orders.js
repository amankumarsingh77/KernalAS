// server.js

const express = require('express');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const cors = require('cors')

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors())

const razorpay = new Razorpay({
    key_id: 'rzp_test_GxDb6mfIvPQTXw', // Replace with your Razorpay Key ID
    key_secret: 'mjYPXotQkZhkVhVlLgTqHEP9', // Replace with your Razorpay Key Secret
});

app.post('/create-order', async (req, res) => {
    const amount = req.body.amount; // Amount in paise (in this example, ₹500)
    const currency = 'INR';

    const options = {
        amount: amount,
        currency,
        receipt: 'order_receipt_123',
        payment_capture: 1,
    };

    try {
        const response = await razorpay.orders.create(options);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
