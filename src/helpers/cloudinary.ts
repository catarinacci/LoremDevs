import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.CLOUD_KEY as string,
  api_secret: process.env.CLOUD_KEY_SECRET as string,
});

export default cloudinary