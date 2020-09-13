import multer, { diskStorage } from 'multer';

import upload, { imageFileFilter, uuidFilename } from '../upload';

const ImageUpload = {
  upload: multer({
    fileFilter: imageFileFilter,
    storage: diskStorage({
      destination: upload.tmpFolder,
      filename: uuidFilename,
    }),
  }),
};

export default ImageUpload;
