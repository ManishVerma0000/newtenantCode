const admin = require('../schema/adminschema')
const tenat = require('../schema/tenatModel')

const registerAdmin = async (req, res) => {

    try {

        const { phone, name, email, password } = req.body
        if (!phone || !email || !password || !name) {
            await res.status(400).send({ message: "please enter all the details" })
        } else {
            const data = await admin.create(
                req.body
            )

            await res.status(200).send({ message: "creatiopn of the admin is successfull", data: data })
        }

    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}




const loginadmin = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            await res.status(400).send({ message: "please enter all the details" })
        } else {
            const compareuser = await admin.findOne({ email: email });
            if (!compareuser) {
                await res.status(400).send({ message: "user is not find" })
            } else {
                console.log(compareuser.password == password)
                if (compareuser.password == password) {
                    await res.status(200).send({ message: "login completed" })
                } else {
                    await res.status(400).send({ message: "password mismatch" })
                }
            }

        }
    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}





const adminProfile = async (req, res) => {
    try {
        const _id = req.query.id;
        const finduser = await admin.findById(_id)
        await res.status(200).send({ message: "here is the admin details", data: finduser })

    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}





module.exports = { registerAdmin, loginadmin, adminProfile }