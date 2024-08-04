const dontenv = require("dotenv");
dontenv.config();
const express = require("express");
const app = express();
const port = 7000;
const fs = require("fs-extra");
const cors = require("cors");
const router = require("./routes/routes");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const { uploadsecond, uploadsingleImage } = require("./middleware/auth");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const conn = require("./conn/db");
const tenat = require("./schema/tenatModel");

require("aws-sdk/lib/maintenance_mode_message").suppress = true;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use("/api", router);

const cron = require("node-cron");
const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const directoryPath = "./pdf";

app.post("/img", uploadsecond, async (req, res) => {
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
        const result = await tenat.findByIdAndUpdate(
          "66a5e591896d018eca8c691d",
          { tenates: resultArray }
        );
        console.log("tentates is added", result);
      })
      .catch((error) => {
        console.error("Error processing arrays:", error);
      });
    await res.status(200).send(arrayofPath);
  }
});

async function deleteAllFiles() {
  try {
    const files = await fs.readdir(directoryPath);
    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(directoryPath, file);
        await fs.unlink(filePath);
        console.log("File deleted:", filePath);
      })
    );
  } catch (err) {
    console.error("Error reading directory or deleting files:", err);
  }
}

const checkBillpending = require("./controllers/checkbillpending");

cron.schedule("0 0 15 * *", () => {
  const currentTime = new Date().toLocaleTimeString();
  deleteAllFiles();
  console.log("Task executed at:", currentTime);
});

// cron.schedule('*/10 * * * * *', () => {
//   checkBillpending();
//   console.log("Task executed at:", new Date());
// });
app.use("/pdf", express.static("pdf"));

// app.post("/registertenate",uploadsingleImage,async(req,res)=>{
//     try {
//       console.log(req.file.location)
//       console.log(req.body)
//     } catch (error) {
//         console.log(error)
//     }

// });

app.get("/", async (req, res) => {
  await res.status(200).send({ message: "welcome to the first page" });
});

const ipAddress = "192.168.1.109";

app.listen(port, ipAddress, () => {
  console.log(`server is listen on the port on  http://${ipAddress}:${port}`);
});
