const express=require('express')
const cors=require('cors')
const nodemailer=require('nodemailer')
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())



/**
 * To change email id (to be used for sending emails)
 * 
 * 1. Go to account setting of your GMAIL account.
 * 2. Then go to 'allow less secure apps..'.
 * 3. Generate a new password and use that here to allow nodemailer to logging in your gmail account, skipping 2 step verification step.
 *  
 * 
 * Reference:
 * https://stackoverflow.com/questions/26196467/sending-email-via-node-js-using-nodemailer-is-not-working
 * 
 * If you want to send emails from different accounts, then you'll have to create multiple transporters.
 * 
 * Also make sure that transporter is defined globally, out from all the routes.  
 */


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tcrvitcc@gmail.com',
        pass: 'skgcymxjkreofwrs'
    }
});


/**
 * this endpoint is for sending user's credentials when a new account is created from admin panel.
 */

app.post("/sendMail",async(req,res)=>{

    let mailOptions = {
        from: 'tcrvitcc@gmail.com',
        to: req.body.email||'technocratsroboticsvit@gmail.com',
        subject: 'Technocrats Member Profile Credentials',
        html: `
        <h1><u>Credentials for your Technocrats Member Profile</u></h1>
        <p><b><u>Username:</u></b> ${req.body.data.username}</p>
        <p><b><u>Password:</u></b> ${req.body.data.password}</p>
        `
    };
    
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(400).send({error:error})
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send({message:"Sent"});
        }
    });
})


/**
 * endpoint to send feedback submitted by user in Contact Us form to TCR's official mail id 
 */
app.post("/sendFeedback",async(req,res)=>{

    let mailOptions = {
        from: 'tcrvitcc@gmail.com',
        to: 'technocratsroboticsvit@gmail.com',
        subject: 'Got a Feedback !!',
        html: `
        <h1><u>Feedback</u></h1>
        <p><b><u>Name:</u></b> ${req.body.data.name}</p>
        <p><b><u>Email:</u></b> ${req.body.data.email}</p>
        <p><b><u>Contact:</u></b> ${req.body.data.contact}</p>
        <p><b><u>Message:</u></b> ${req.body.data.message}</p>
        `
    };
    
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(400).send({error:error})
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send({message:"Sent"});
        }
    });
})



/**
 * Dummy URL
 */
app.get("/",(req,res)=>{
    console.log("in /")
    res.send("Hello World")
})

var port = process.env.PORT || 5000;


app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});
