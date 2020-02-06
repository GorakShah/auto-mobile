import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (request, file, cb) => cb(null, path.join(__dirname, '..', '..', 'public', 'images')),
  filename: (request, file, cb) => cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`),
});

const checkFileType = (file, cb) => {
// check file type
  const fileType = /jpeg|jpg|gif|png/;
  // check ext
  const extname = fileType.test(path.extname(file.originalname).toLocaleLowerCase());
  // check mime type
  const mimetype = fileType.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  }
  return cb({ Error: 'No file slected', message: 'No File selected' });
};

const upload = multer({
  storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => checkFileType(file, cb),
}).single('image');

export default async (req, res) => {
  console.log('upload file  called');
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.log(err);
        res.statusCode = 500;
        res.send(err.message);
      }
      if (req.file) {
        const updateRes = req.file.filename;
        if (updateRes) {
          res.statusCode = 200;
          res.send(JSON.stringify(updateRes));
        } else {
          throw new Error('Upload faild');
        }
      }
    });
  } catch (e) {
    console.log('error in file upload', e);
    res.statusCode = 400;
    res.send(JSON.stringify(e));
  }
};
