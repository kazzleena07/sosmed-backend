const nodemailer = require("nodemailer");

const createMailTransporter = () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "kareninaruth@gmail.com",
            pass: "uttygcnrlwfiyxkd"
        },
    });

    return transporter;
}

module.exports = { createMailTransporter };