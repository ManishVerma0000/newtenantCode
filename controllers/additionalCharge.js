const rent = require("../schema/rentModel");
const tenat = require("../schema/tenatModel");

const additionalCharge = async (req, res) => {
    try {
        const id = req.query.id;
        console.log(id)
        if (!id) {
            await res.status(400).send({ message: "please provide the id" })
        } else {
            const finduser = await tenat.findByIdAndUpdate(id, {
                "waterCharge": req.body.waterCharge,
                "electricitycharge": req.body.electricitycharge,
                "otherCharge": req.body.otherCharge,
                onhold: true,
                ispending: false

            }, { new: true });

            const TenantRent = await tenat.findById(id)
            console.log(TenantRent.rent, 'TenantRent')

            console.log(parseInt(req.body.waterCharge), 'parseInt(req.body.waterCharge)')
            const totalBill = parseInt(req.body.waterCharge) + parseInt(req.body.electricitycharge) + parseInt(req.body.otherCharge) +
                parseInt(TenantRent.rent)

            console.log(finduser)
            const updateTenantRent = await rent.create({
                Amount: totalBill,
                TenateId: id,
                ispending: false,
                ishold: true,
                billDate: new Date()
            })
            console.log(updateTenantRent)
            // console.log(updateTenantRent)

            await res.status(200).send(finduser)
        }

    } catch (error) {
        console.log(error)
        await res.status(400).send({ message: error.message })
    }
}

module.exports = additionalCharge 