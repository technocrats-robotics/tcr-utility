const nodemailer = require("nodemailer");

// constants
const { SERVICE, EMAIL, PASSWORD } = require("../constants");

const transporter = nodemailer.createTransport({
  service: SERVICE,
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

module.exports = transporter;
