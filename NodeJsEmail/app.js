const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Body parser middleware to parse POST request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// POST route to handle form submission
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Create a nodemailer transporter using SMTP
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'YOUR_EMAIL_ADDRESS@gmail.com',  // Replace with your Gmail address
            pass: 'YOUR_GOOGLE_APP_PASSWORD(NOT YOUR USUAL PASSWORD)'         // Replace with your Gmail password or App-specific password
        }
    });

    // Email message options
    let mailOptions = {
        from: 'YOUR_EMAIL_ADDRESS@gmail.com',   // Sender address
        to: 'YOUR_EMAIL_ADDRESS@gmail.com', // List of recipients
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Failed to send email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
