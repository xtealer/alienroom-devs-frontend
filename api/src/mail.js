const router = require("express").Router();
const nodemailer = require("nodemailer");
const axios = require("axios");

router.post(async (request, response) => {
  const { body } = request;

  try {
    const tokenAuthResponse = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      undefined,
      {
        params: {
          secret: process.env.AUTH_RECAPTCHA,
          response: body.token,
        },
      }
    );

    if (tokenAuthResponse.status === 200 && tokenAuthResponse.data.success) {
      // send contact email request
      await main(body);

      response.status(200).json({
        message: "Contact mail send successfully!",
        code: "successful_request",
      });

      return;
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;

// create reusable transporter object using the default SMTP transport
async function main(contactRequestData) {
  const { email, description, name } = contactRequestData;

  if (!email || !name || !description) {
    const error = { message: "Missing Params" };
    throw error;
  }

  let transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: '"Alien Bot" <bot@alienroom.dev>', // sender address
    to: "info@alienroom.dev", // list of receivers
    cc: [
      "alvaro@alienroom.dev",
      "enmanuel@alienroom.dev",
      "adrian@alienroom.dev",
      "xtealer@alienroom.dev",
    ],
    subject: `Contact Request From ${name}`, // Subject line
    text: createPlainTextMessage(contactRequestData), // plain text body
    html: createHTMLMessage(contactRequestData), // html body
  });
}

// helper functions
function createHTMLMessage({ email, description, name }) {
  return `<h1 style="text-decoration: underline;">Contact Request Information:</h1>
  <p><b>Name:</b> <span>${name}</span></p>
  <p><b>Contact Email:</b> <span>${email}</span></p>
  <p><b>Description:</b> <span>${description}</span></p>`;
}

function createPlainTextMessage({ email, description, name }) {
  return `Contact Request Information:
  
  Name: ${name}
  Contact Email: ${email}
  Description: ${description}`;
}
