import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'send-it',
  allowedFormats: ['jpg', 'png'],
  filename(req, file, cb) {
    const { userId } = jwt.decode(req.headers.authorization.split(' ')[1]);
    cb(undefined, userId);
  },
});

const fileFilter = (req, file, cb) => {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    req.typeError = 'Only jpeg or png images are allowed!';
    return cb(undefined, false);
  }
  return cb(undefined, true);
};


const parser = multer({ storage, fileFilter });

export default parser;
