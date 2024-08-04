const tenat = require("../schema/tenatModel");

const totalBill = async (req, res) => {
  try {
    const currentDate = new Date();
    const threeMonthsBeforeDate = new Date(currentDate);
    threeMonthsBeforeDate.setMonth(threeMonthsBeforeDate.getMonth() - 3);
    const tenants = await tenat.find({
      NextInstallement: { $lt: threeMonthsBeforeDate },
    });
    res.json(tenants);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const pendingBill = async (req, res) => {
  try {
    const pendingBills = await tenat.find({ ispending: true });
    await res.status(200).send(pendingBills);
  } catch (error) {
    await res.status(400).send({ message: error.message });
  }
};

const completedPayement = async (req, res) => {
  try {
    const pendingBills = await tenat.aggregate([
      {
        $match: {
          ispending: false,
          onhold: false,
        },
      },
    ]);
    await res.status(200).send(pendingBills);
  } catch (error) {
    await res.status(400).send({ message: error.message });
  }
};

const updatePaymentsuccess = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      await res.status(400).send({ message: "please enter the id" });
    } else {
      const updateDetailstodb = await tenat.findByIdAndUpdate(id, {
        ispending: false,
      });
      await res.status(200).send(updateDetailstodb);
    }
  } catch (error) {
    await res.status(400).send({ message: error.message });
  }
};

const makepayementpending = async (req, res) => {
  try {
    const id = req.query.id;
    console.log(id);
    if (!id) {
      await res.status(400).send({ message: "please enter the id" });
    } else {
      const updateDetailstodb = await tenat.findByIdAndUpdate(id, {
        ispending: true,
      });
      await res.status(200).send(updateDetailstodb);
    }
  } catch (error) {
    await res.status(400).send({ message: error.message });
  }
};

module.exports = {
  totalBill,
  pendingBill,
  completedPayement,
  updatePaymentsuccess,
  makepayementpending,
};
