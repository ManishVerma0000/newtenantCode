const tenat = require("../schema/tenatModel");
const checkBillpending = async () => {
  try {
    const tenateDetails = await tenat.find();
    for (let tenant of tenateDetails) {
      const nextInstallmentDate = new Date(tenant.NextInstallement);
      const currentDate = new Date();
      const newDate = new Date(currentDate);
      newDate.setMonth(currentDate.getMonth() + 1);
      const updatednextInstallmentDate = newDate;
      if (currentDate.getTime() == nextInstallmentDate.getTime) {
        tenant.ispending = true;
        (tenant.waterCharge = ""),
          (tenant.electricitycharge = ""),
          (tenant.otherCharge = ""),
          (tenant.NextInstallement = updatednextInstallmentDate);
        const data = await tenant.save()
        console.log(data)
      }
    }

  } catch (error) {
   return error
  }
};

module.exports = checkBillpending;
