const rent = require('../schema/rentModel')



const addrent = async (req, res) => {
    try {
        const { Amount, TenateId, Month, ispending } = req.body;

        if (!Amount || !TenateId || !Month || !ispending) {
            await res.status(400).send({ message: "please enter all the details" })
        } else {
            const createRent = await rent.create(req.body);
            await res.status(200).send(createRent)

        }
    } catch (error) {

        await res.status(400).send(error.message)
    }
}

const listofrent = async (req, res) => {
    const data = await rent.find({})
    await res.status(200).send(data)
}



module.exports = { addrent, listofrent }
