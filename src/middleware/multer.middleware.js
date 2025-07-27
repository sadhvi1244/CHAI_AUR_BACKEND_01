import multer from "multer";

//use disk storage for file uploads
//this will save the uploaded files to a temporary directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export { upload }; 
