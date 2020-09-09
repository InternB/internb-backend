import multer, { diskStorage } from 'multer';

import upload, { wordPDFFileFilter, uuidFilename } from '../upload';

const PdfGuideUpload = {
  upload: multer({
    fileFilter: wordPDFFileFilter,
    storage: diskStorage({
      destination: upload.tmpFolder,
      filename: uuidFilename,
    }),
  }),
};

export default PdfGuideUpload;
