const express = require("express");
const path = require("path");
const nodemailer = require('nodemailer');
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 5000
const RECEIVER_EMAIL = "diego.caudillo@uabc.edu.mx"
const PASSWORD = "golied12"


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname + "/index.html"))
})

app.post('/sendEmail', (req, res)=>{
    comment_info = req.body;
    
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: RECEIVER_EMAIL,
        pass: PASSWORD
    }
    });

    const mailOptions = {
        from: RECEIVER_EMAIL,
        to: comment_info.email,
        subject: 'Portfolio comment',
        text: comment_info.comment
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    res.redirect('/');
});
})

/* uncomment for deploymet */
/* app.listen(PORT, ()=> console.log(`App initialized on port ${PORT}`)); */