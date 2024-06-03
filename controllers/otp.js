// const twilio = require('twilio');


// const otp = async (req, res) => {
//     const accountSid = process.env.TWILIOACCOUNTSID;
//     const authToken = process.env.TWILIOAUTHTOKEN;
//     const client = twilio(accountSid, authToken);
//     function generateOTP() {
//         return Math.floor(1000 + Math.random() * 9000).toString();
//     }
//     function sendOTPviaSMS() {
//         const otp = generateOTP();
//         const message = `hii Sachin Jaru  your bill of the last month   is https://electricitydevmanish.s3.ap-south-1.amazonaws.com/f807c441-93af-4ac1-9583-08eefb166075.pdf`;
//         const fromPhoneNumber = +12073054980
//         // Send the SMS
//         client.messages
//             .create({
//                 body: message,
//                 from: fromPhoneNumber,
//                 to: +918460536510,
//             })

//             .then(async (message) => {
//                 console.log('OTP sent successfully:', message.sid)


//             })
//             .catch((error) => console.error('Error sending OTP:', error));
//     }

//     sendOTPviaSMS();
// }




const puretext = require('puretext');
require('request');

const otp = async (req, res) => {
    let text = {
        // To Number is the number you will be sending the text to.
        toNumber: '+918818040732',
        // From number is the number you will buy from your admin dashboard
        fromNumber: '+918818040732',
        // Text Content
        smsBody: 'Sending SMS using Node.js',
        //Sign up for an account to get an API Token
        apiToken: 'testaccount'
    };

    puretext.send(text, function (err, response) {
        if (err) console.log(err);
        else console.log(response)
    })
}
module.exports = otp;