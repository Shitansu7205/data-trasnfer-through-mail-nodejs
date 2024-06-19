const nodemailer = require('nodemailer');

const home = (req, res) => {
    res.send('hello world');
};

const getData = async (req, res) => {
    const data = req.body;
    console.log(data);
    console.log("Data received successfully....");

    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, // Your email
            pass: process.env.EMAIL_PASSWORD // Your email password or app password
        }
    });

    // Setup email data
    let mailOptions = {
        from: process.env.EMAIL, // Sender address
        to: 'shitansukumargochhayat@gmail.com', // List of receivers
        subject: 'Contact Form Submission', // Subject line
        text: `You have a new contact form submission:\n\nName: ${data.name}\nEmail: ${data.email}\nCheck-in: ${data.datetimepicker}\nCheck-Out: ${data.datetimepickercheck}\nNumbers-of-Pax: ${data.pax}\nContact-no: ${data.contact}\nMessage: ${data.msg}`, // Plain text body
        
    };

    try {
        // Send mail with defined transport object
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        res.status(200).send({ message: 'Email sent successfully', data });
    } catch (error) {
        console.error('Error sending email: ', error);
        res.status(500).send({ message: 'Error sending email', error });
    }
};

module.exports = { home, getData };
