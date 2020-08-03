const axios = require("axios");
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

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

async function main(contactRequestData) {
  // create reusable transporter object using the default SMTP transport

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
      user: "bot@alienroom.dev",
      pass: functions.config().mail.password,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Alien Bot" <bot@alienroom.dev>', // sender address
    to: "alienbyte@alienroom.dev", // list of receivers
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
// 6LdjvrkZAAAAAB1d3-fxrkd0B1BqnTMp-Hpvm9K7
// https://www.google.com/recaptcha/api/siteverify
exports.sendContactMail = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const { method, body } = request;

    const secret = functions.config().auth.recaptcha;

    if (method.toLowerCase() === "post") {
      try {
        const tokenAuthResponse = await axios.post(
          "https://www.google.com/recaptcha/api/siteverify",
          undefined,
          {
            params: {
              secret,
              response: body.token,
            },
          }
        );

        if (
          tokenAuthResponse.status === 200 &&
          tokenAuthResponse.data.success
        ) {
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
    }

    response.status(422).json({
      message: "Could not process request.",
      code: "invalid_request",
    });
  });
});
