const axios = require('axios')

const addharCardVerification = async (req, res) => {
    try {

        const addharcardnumber = 866376196167;
        console.log(addharcardnumber)
        if (!addharcardnumber) {
            await res.status(400).send({ message: "please enter the addhar card number" })
        } else {
            try {
                const date = new Date().toLocaleDateString()
                let data = JSON.stringify({
                    "uid": addharcardnumber
                });
                let config = {
                    method: 'post',
                    url: process.env.URL,
                    headers: {
                        'clientId': process.env.CLIENTID,
                        'secretKey': process.env.SECRETKEY,
                        'Content-Type': 'application/json',
                    },
                    data: data
                };
                // const encrypt_pan_number = EncryptData(uid)
                axios.request(config)
                    .then(async (response) => {
                        console.log(response.data)
                        await res.status(200).send("verified")

                    })
                    .catch(async (error) => {
                        await res.status(500).send({ message: error.message })
                    });

            } catch (error) {
                await res.status(500).send({ message: error.message })
            }
        }

    } catch (error) {
        await res.status(400).send({ message: error.message })

    }
}

module.exports = addharCardVerification