import multer, { diskStorage } from 'multer';

import upload, { wordPDFFileFilter, uuidFilename } from '../upload';

export const ContractsUpload = {
  upload: multer({
    fileFilter: wordPDFFileFilter,
    storage: diskStorage({
      destination: upload.tmpFolder,
      filename: uuidFilename,
    }),
  }),
};

export default ContractsUpload;
