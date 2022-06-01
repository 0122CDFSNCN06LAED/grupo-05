const multer = require("multer");

const storage = multer.diskStorage({
  dest: function (req, file, cb) {
    cb(null, null, "images/user-images");
  },
  filename: function (req, file, cb) {
    console.log("filee", file);
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});
/* const upload = multer({ storage: storage }); */

module.exports = upload;
