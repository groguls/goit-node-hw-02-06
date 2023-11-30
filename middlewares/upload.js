const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("temp"));
  },
  filename: function (req, file, cb) {
    cb(null, `${req.user._id}_${file.originalname}`);
  },
});

const uploadAvatarMiddleware = multer({ storage }).single("avatar");

module.exports = uploadAvatarMiddleware;
