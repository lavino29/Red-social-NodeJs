const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const image =   multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, "../public/upload"),
        filename: (req, file, cb) => {
          cb(null,uuidv4()+ path.extname(file.originalname));
        }
      })
  }).single("image")

  module.exports = image