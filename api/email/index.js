const cors = require("micro-cors");
const nm = require("nodemailer");
const axios = require("axios");
const requestip = require("request-ip");

async function verifyCaptcha(response, remoteIp) {
  const verifyBody = {
    secret: process.env.RECAPTCHA_SECRET_KEY,
    response,
    remoteIp,
  };

  try {
    const res = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        body: JSON.stringify(verifyBody),
      }
    );

    return res.data.success;
  } catch (err) {
    console.error(`recaptcha failed: ${err}`); // send to datadog
    // api service errored, we don't want to lose real requests
    return true;
  }
}

module.exports = cors()(async function (req, res) {
  const {
    body: { captchaToken, ...body },
  } = req;

  const success = await verifyCaptcha(captchaToken, requestip.getClientIp(req));

  const transporter = nm.createTransport({
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const text = Object.entries(body).reduce(
    (acc, [key, value]) => `${acc}\n${key}: ${value}\n`,
    ""
  );

  const mail = {
    from: "Website Request <info@pepisandbox.com>",
    to: process.env.CONTACT_RECIPIENT,
    subject: `${success ? "" : "[spam detected]"} Website contact request [${
      body.Name || "Anonymous"
    }]`,
    text,
  };

  transporter.sendMail(mail, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).send(`{ "error": ${error.message} }`);
    }

    res.status(200).send(`{ "status": "success" }`);
  });
});
