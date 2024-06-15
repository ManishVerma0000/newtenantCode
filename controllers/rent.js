const tenat = require("../schema/tenatModel")

const totalBill = async (req, res) => {
    try {
        // Step 1: Get the current date and calculate the date three months before
        const currentDate = new Date();
        const threeMonthsBeforeDate = new Date(currentDate);
        threeMonthsBeforeDate.setMonth(threeMonthsBeforeDate.getMonth() - 3);
        console.log(threeMonthsBeforeDate)

        // Step 2: Query the database to find tenants with installments before this date
        const tenants = await tenat.find({ "NextInstallement": { $lt: threeMonthsBeforeDate } });

        // Step 3: Send the filtered tenants as the response
        res.json(tenants);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};



const pendingBill = async (req, res) => {
    try {
        const pendingBills = await tenat.find({ ispending: true })
        await res.status(200).send(pendingBills)

    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}



const completedPayement = async (req, res) => {
    try {


        const pendingBills = await tenat.aggregate([{
            $match: {
                ispending: false,
                onhold: false
            }
        }])

        // db.users.aggregate([
        //     { $group: { _id: "$city", totalUsers: { $sum: 1 } } }
        // ])

        // const pendingBills = await tenat.find({ ispending: false, ishold: false })
        await res.status(200).send(pendingBills)

    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}


const updatePaymentsuccess = async (req, res) => {
    try {


        const id = req.query.id;
        console.log(id)
        if (!id) {
            await res.status(400).send({ message: "please enter the id" })
        } else {
            const updateDetailstodb = await tenat.findByIdAndUpdate(id, {
                ispending: false
            })

            console.log(updateDetailstodb)
            await res.status(200).send(updateDetailstodb)
        }

    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}



const makepayementpending = async (req, res) => {
    try {


        const id = req.query.id;
        console.log(id)
        if (!id) {
            await res.status(400).send({ message: "please enter the id" })
        } else {
            const updateDetailstodb = await tenat.findByIdAndUpdate(id, {
                ispending: true
            })

            console.log(updateDetailstodb)
            await res.status(200).send(updateDetailstodb)
        }

    } catch (error) {
        await res.status(400).send({ message: error.message })
    }
}



module.exports = { totalBill, pendingBill, completedPayement, updatePaymentsuccess, makepayementpending }