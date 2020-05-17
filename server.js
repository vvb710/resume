const express = require('express')
const path = require('path')
const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = process.env.SENDGRID_API_KEY
const port = process.env.PORT
const { check, validationResult } = require('express-validator');
const app = express()

sgMail.setApiKey(sendgridAPIKey)

app.use(express.json());

const sendWelcomeEmail = (contactDetails) => {
    const { contactName, contactEmail, contactSubject, contactMessage } = contactDetails

    sgMail.send({
        to: "vvb710@gmail.com",
        from: 'vvb710@outlook.com',
        subject: contactSubject,
        text: `Hi Vivek, ${contactName} - ${contactEmail} sent you message. Message : ${contactMessage}`,
        html: `<html> Hi Vivek, <br> ${contactName}  
                sent you message. <br>  Message : ${contactMessage} <br>
                Mail Id : <p style="text-decoration: underline;">${contactEmail}</p>
                </html>`
    })
}

app.post('/', [
    check('contactName', 'Name is required').not().isEmpty(),
    check('contactSubject', 'Subject is required').not().isEmpty(),
    check('contactEmail', 'Enter a valid email id').isEmail(),
    check('contactMessage', 'Enter a message before sending').not().isEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        sendWelcomeEmail(req.body)
        res.status(200).send('Your message has been sent successfully!!! Thank You for contacting')
    } catch (error) {
        res.status(500).json({ errors: 'Something went wrong!!! Please try again after sometime' })
    }

})

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || port

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})