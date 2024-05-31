



const building = require('../schema/buildingModel');

const addbuilding = async (req, res) => {
    try {


        const { buildingname, room, location, caretaker, phoneNumber, buildingRoomName } = req.body
        console.log(req.body)
        console.log(parseInt(room))

        if (!buildingname || !room || !location || !caretaker || !phoneNumber || !buildingRoomName) {
            await res.status(400).send('please enter the building')
        } else {
            let arrayOfRooms = []
            const sendAllEmails = async () => {
                for (let i = 1; i <= parseInt(room); i++) {
                    arrayOfRooms.push(buildingRoomName + i)
                }

            };
            sendAllEmails()

            const createBuilding = await building.create({
                buildingname,
                rooms: arrayOfRooms || [],
                location,
                phoneNumber,
                caretaker,
                buildingRoomName
            });
            console.log(createBuilding)

            await res.status(200).send(createBuilding)

        }

    } catch (error) {
        await res.status(400).send(error.message)
    }
}






const listofbuilding = async (req, res) => {
    try {
        const listofbuildingdata = await building.find({})
        await res.status(200).send(listofbuildingdata)

    } catch (error) {
        await res.status(400).send(error.message)

    }
}



const totalRoom = async (req, res) => {
    try {
        const buildingId = req.query.id;
        if (!buildingId) {
            await res.status(400).send({ message: "please enter the id" })
        } else {
            const findBuilding = await building.findById({ _id: buildingId })
            await res.status(200).send({ message: "details", data: findBuilding })
        }


    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}

const Building = require('../schema/buildingModel');



const findopenRoomsOfBuilding = async (req, res) => {
    try {
        const buildingId = req.query.id;
        if (!buildingId) {
            await res.status(400).send({ message: "Please select the building id" })
        } else {
            const buildingDetails = await building.findById({ _id: buildingId })
            await res.status(200).send(buildingDetails)
        }

    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}


const updateRoom = async (req, res) => {

    try {
        const { buildingId, selectedRooms } = req.body;
        console.log(req.body)
        const building = await Building.findById(buildingId);
        console.log(building)
        const formattedSelectedRooms = Array.isArray(selectedRooms) ? selectedRooms : [selectedRooms];
        building.completedRoom.push(...formattedSelectedRooms);
        building.rooms = building.rooms.filter(room => !formattedSelectedRooms.includes(room));
        await building.save();
        res.status(200).json({
            message: 'Rooms selected successfully',
            data: building
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteBuildings = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            await res.status(400).send({ message: "please enter the id here" })
        } else {
            const buildingdetails = await building.findByIdAndDelete({ _id: id })

            await res.status(200).send({ message: "buildings details", data: buildingdetails })
        }

    } catch (error) {
        await res.status(400).send({ message: error.message })

    }
}




const updateBuildings = async (req, res) => {
    try {

        const _id = req.query.id;
        const data = req.body
        if (!_id) {
            await res.status(400).send({ message: "please enter the building details" })
        } else {
            const buildinddetailsdata = await building.findByIdAndUpdate(_id, { data })
            await res.status(200).send(buildinddetailsdata)
        }

    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}

const singleBuildingDetails = async (req, res) => {
    try {
        const id = req.query.id
        if (!id) {
            await res.status(400).send({ message: "please enter the building details" })
        } else {
            const singleBuildingDetailsdb = await building.findById(id)
            await res.status(200).send(singleBuildingDetailsdb)
        }



    } catch (error) {
        await res.status(400).send(error.message)

    }
}


module.exports = {
    addbuilding, listofbuilding, updateBuildings, totalRoom, deleteBuildings, updateRoom,
    singleBuildingDetails,
    findopenRoomsOfBuilding
}