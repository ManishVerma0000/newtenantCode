
const tenate = require('../schema/tenatModel')
const listoftenate = async (req, res) => {
    try {

        console.log('api is hit')
        const list = await tenate.find({})
        await res.status(200).send({ data: list })

    } catch (error) {
        await res.status(400).send(error)
    }
}

module.exports = listoftenate