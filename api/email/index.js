const cors = require('micro-cors')
const nm = require('nodemailer')

module.exports = cors()(function(req, res) {
    const { body } = req
    
    return res.send(200, { "status": "success" })

    const transporter = nm.createTransport({
        host: process.env.SMTP_HOST,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })

    const text = Object.entries(body).reduce((acc, [key, value]) => 
        `${acc}\n${key}: ${value}\n`
    , '')
    
    const mail = {
        from: 'No Reply <noreply@metro-pest.com>',
        to: process.env.CONTACT_RECIPIENT,
        subject: `Website contact request [${body.name}]`,
        text
    }

    transporter.sendMail(mail, (error) => {
        if (error) {
            return res.send(500, error.message)
        }

        res.send(200, `{ "status": "success" }`)
    })
})