const tenat = require("../schema/tenatModel");

const findAvailableRoom = async (req, res) => {
    try {

        const buildingId = req.body.buildingId;
        if (!buildingId) {
            await res.status(400).send({ message: "please enter the building id" })
        } else {
            const alreadyroomassociated = await tenat.find({
                buildingId: buildingId
            })
            await res.status(200).send({ message: "here is the details", data: alreadyroomassociated })
        }


    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}

module.exports = findAvailableRoom