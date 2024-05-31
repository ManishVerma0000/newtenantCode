const building = require("../schema/buildingModel")

const allVacanatRooms = async (req, res) => {
    try {

        const allRooms = await building.find().select('_id rooms buildingname location');
        await res.status(200).send({ message: "list of all the rooms", data: allRooms })

    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}

module.exports = allVacanatRooms