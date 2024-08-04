const tenat = require("../schema/tenatModel");

const addTenantelist = async (req, res) => {
  try {
    console.log(req.files);
    console.log(req.body);
    if (req.files) {
      const arrayofPath = [];
      await Promise.all(
        req.files.map(async (s3url) => {
          arrayofPath.push(s3url.location);
        })
      );
      const arrname = req.body.username.split(",");
      const reult = req.body.phone.split(",");
      let resultArray = [];
      let promises = arrname.map((name, i) => {
        return new Promise((resolve, reject) => {
          try {
            let tempArray = [name, reult[i], arrayofPath[i]];
            resolve(tempArray);
          } catch (error) {
            reject(error);
          }
        });
      });
      Promise.all(promises)
        .then(async (resultArray) => {
          const result = await tenat.findByIdAndUpdate(req.body.id, {
            tenates: resultArray,
          });
          console.log("tentates is added", result);
        })
        .catch((error) => {
          console.error("Error processing arrays:", error);
        });
      await res.status(200).send(arrayofPath);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = addTenantelist;
