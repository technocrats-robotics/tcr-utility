const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

// user verification
const verifyToken = require("./ValidateUser/validateuser");

// google photos
const { getAlbum } = require("./GooglePhotos/googlePhotos");

// mail
const transporter = require("./Mailer/transporter");
const sendEmail = require("./Mailer/mail");

// constants
const { EMAIL, EMAILTO, ALBUMID } = require("./constants");

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("public"));

/**
 * To change email id (to be used for sending emails)
 *
 * 1. Go to account setting of your GMAIL account.
 * 2. Then go to 'allow less secure apps..'.
 * 3. Generate a new password and use that here to allow nodemailer to logging in your gmail account, skipping 2 step verification step.
 *
 * Reference:
 * https://stackoverflow.com/questions/26196467/sending-email-via-node-js-using-nodemailer-is-not-working
 *
 */

/**
 * this endpoint is for sending user's credentials when a new account is created from admin panel.
 */

app.post("/sendMail", verifyToken, async (req, res, next) => {
  let mailOptions = {
    from: EMAIL,
    to: req.body.email || EMAIL,
    subject: "Technocrats Member Profile Credentials",
    html: `
        <h1>Welcome to Technocrats Robotics</h1>
        <p>Click on the&nbsp;<strong>Member Login</strong> button at the bottom footer of the web app.</p>
        <p><span style="color: #0000ff;">Following are your credentials to customize your profile on the web app:<br /> <span style="color: #ff0000;"><strong>Username:</strong> ${req.body.data.username}</span><br /><span style="color: #ff0000;"><strong>Password:</strong> ${req.body.data.password}<br /></span>Whosoever holds these credentials, if he be worthy, shall possess the power of a Member.</span></p>
        <p>Once logged in, change your password for the security of your information.<br />Also, modify your profile to reflect the changes in your member cards in the&nbsp;<strong>Teams</strong> section.</p>
        <p>Enjoy!🔥</p>
        <blockquote>
        <p><strong>This is only a foretaste of what is to come, and only the shadow of what is going to be. <em>~ Alan Turing</em></strong></p>
        </blockquote>
        `,
  };

  let response = await sendEmail(transporter, mailOptions, next);

  if (response) res.status(200).send({ message: "Sent" });
});

/**
 * endpoint to send feedback submitted by user in Contact Us form to TCR's official mail id
 */
app.post("/sendFeedback", verifyToken, async (req, res, next) => {
  let mailOptions = {
    from: EMAIL,
    to: EMAILTO,
    subject: "Got a Feedback !!",
    html: `
        <h1><u>Feedback</u></h1>
        <p><b><u>Name:</u></b> ${req.body.data.name}</p>
        <p><b><u>Email:</u></b> ${req.body.data.email}</p>
        <p><b><u>Contact:</u></b> ${req.body.data.contact}</p>
        <p><b><u>Message:</u></b> ${req.body.data.message}</p>
        `,
  };

  try {
    const response = await sendEmail(transporter, mailOptions, next);

    if (response) res.status(200).send({ message: "Sent" });
  } catch (err) {
    next(err);
  }
});

/**
 * get the album id from google photos and pass it in the function getAlbum(<id>)
 *
 */

app.get("/gallery", verifyToken, async (req, res, next) => {
  const result = await getAlbum(ALBUMID);
  res.json(result);
});

/*
 * information
 */
app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/" + "Information/information.html");
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

var port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log("Express server listening on port " + port);
});
