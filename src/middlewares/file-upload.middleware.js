import multer from "multer";
//storing files on disc:
const storageConfig = multer.diskStorage({
  //Returns a StorageEngine implementation configured to store files on the local file system
  destination: (req, file, cb) => {
    //req,file and callback
    cb(null, "public/images/"); //callbackfunction ,no errors as we get the images so null
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "_" + file.originalname; //this originalname we receive from teh client
    cb(null, name);
  },
});
export const uploadFile = multer({ storage: storageConfig });
