const rent = require("../schema/rentModel")
const tenat = require("../schema/tenatModel")

const holdBills = async (req, res) => {
    try {

        const findholdbills = await tenat.find({ onhold: true })
        await res.status(200).send({ message: "here is the list", data: findholdbills })

    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}


const updateHoldBills = async (req, res) => {
    try {
        const _id = req.query.id;
        console.log(_id)
        if (!_id) {
            await res.status(400).send({ message: "please provide the id" })
        } else {
            const data = await tenat.findByIdAndUpdate(_id, { onhold: false })
            const updateRentModel = await rent.findOneAndUpdate({ TenateId: { _id } }, {
                ishold: false
            })
            // console.log(updateRentModel, 'this is the update bills')

            await res.status(200).send({ message: "done", data: data })



        }

    } catch (error) {
        console.log(error)
        await res.status(400).send({ message: error.message })
    }
}

module.exports = { holdBills, updateHoldBills }