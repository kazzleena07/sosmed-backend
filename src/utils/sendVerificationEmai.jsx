const { createMailTransporter } = require("./createMailTransporter");

const sendVerificationEmail = (user) => {
    const transporter = createMailTransporter();

    const mailOptions = {
        from: '"Verification Email" <kareninaruth@gmail.com>',
        to: user.email,
        subject: "Verification Email",
        html: `<p>Helo ${user.fullName}, verify your email by clicking this link.</p>
                <a href='http://localhost:5173/verify-email?emailToken=${user.emailToken}'>Verify Your Email</a>`,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Verification email sent");
        }
    });
};

module.exports = { sendVerificationEmail };