



const nodemailer = require("nodemailer");

function sendEmail() {
    console.log('emit is hit')


    var email = 'manishverma88180@gmail.com';
    var text = 'test';
    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'manishverma88180@gmail.com',
            pass: 'yqftirfirjqcunzy'
        }
    });
    var mailOptions = {
        from: 'manishverma88180@gmail.com',
        to: "mkverma5979@gmail.com",
        subject: 'Reset Password',
        attachments: [
            {
                filename: '1712772412709.pdf',
                path: 'middleware/uploads/1712772412709.pdf'
            }
            // You can add more attachments if needed
        ],

        html: '<p>this is the paragrapgh <button><a href="http://127.0.0.1:5500/index.html">click here</a></button></p>'
        // html: '<p>You requested for reset password, kindly use this <a href="http://localhost:5000/forgetpassword'+ text + '">link</a> to reset your password</p>'
        // html :"<h1>this is the forget password link you can use this link <a href=" href='http://localhost:5000/forgetpassword'></h1>"> clickhere</a></h1>"

    };
    mail.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('here')
            console.log(error)
        } else {
            console.log("sent")
        }
    });
}
module.exports = sendEmail;