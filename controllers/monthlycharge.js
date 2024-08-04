const Tenat = require("../schema/tenatModel");

const monthlyCharge = async (req, res) => {
  try {
    let dateObj = new Date();
    dateObj.setMonth(dateObj.getMonth() + 1);
    dateObj.setDate(1);
    let year = dateObj.getFullYear();
    let month = String(dateObj.getMonth() + 1).padStart(2, "0");
    let day = String(dateObj.getDate()).padStart(2, "0");
    let formattedDate = `${year}-${month}-${day}`;

    const totalChargeMonthWise = await Tenat.aggregate([
      {
        $match: {
          NextInstallement: formattedDate,
        },
      },
      {
        $group: {
          _id: null,
          totalWaterCharge: { $sum: { $toInt: "$waterCharge" } },
          totalElectricityCharge: { $sum: { $toInt: "$electricitycharge" } },
          totalOtherCharge: { $sum: { $toInt: "$otherCharge" } },
          totalRent: { $sum: { $toInt: "$rent" } },
        },
      },
    ]);

    res.status(200).json(totalChargeMonthWise);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const Rent = require("../schema/rentModel"); // Adjust the path as needed

const caluclatedrent = async (req, res) => {
  try {
    const date = new Date();
    const results = await Rent.aggregate([
      {
        $match: {
          billDate: { $lte: date },
        },
      },
    ]);

    let pendingTotal = 0;
    let completedTotal = 0;
    results.forEach((rent) => {
      console.log(rent);

      const amount = parseFloat(rent.Amount);
      if (rent.ishold == false && rent.ispending == false) {
        completedTotal += amount;
      } else {
        pendingTotal += amount;
      }
    });

    await res.status(200).send({ pendingTotal, completedTotal });
  } catch (error) {
    await res.status(400).send(error.message);
  }
};

module.exports = { caluclatedrent, monthlyCharge };
