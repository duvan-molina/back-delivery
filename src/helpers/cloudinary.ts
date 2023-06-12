import { v2 as cloudinary } from 'cloudinary';
import { Express } from 'express';
import toStream = require('buffer-to-stream');

export const uploadImage = async (
  file: Express.Multer.File,
): Promise<{
  secure_url: string;
}> => {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream((error, result) => {
      if (error) return reject(error);
      resolve(result);
    });

    toStream(file.buffer).pipe(upload);
  });
};
