import path from 'path';
import { uuid } from 'uuidv4';
import { Request } from 'express';
import multer, { diskStorage } from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IIntershipFormats {
  [key: string]: boolean;
}

interface IFolders {
  tmpFolder: string;
  folders: {
    [key: string]: string;
  };
}

const intershipFormats: IIntershipFormats = {
  '.pdf': true,
  '.doc': true,
  '.odt': true,
  '.docx': true,
};

export default {
  tmpFolder,
  folders: {
    '.pdf': path.resolve(__dirname, tmpFolder, 'pdfs'),
    '.doc': path.resolve(__dirname, tmpFolder, 'docs'),
    '.odt': path.resolve(__dirname, tmpFolder, 'docs'),
    '.docx': path.resolve(__dirname, tmpFolder, 'docs'),
  },
} as IFolders;

const wordPDFFileFilter = (
  _: Request,
  file: Express.Multer.File,
  cb: Function,
): Function => {
  if (!intershipFormats[`${path.extname(file.originalname)}`])
    return cb(new Error('Only PDF and Word files are allowed'));

  return cb(null, true);
};

const uuidFilename = (
  _: Request,
  file: Express.Multer.File,
  cb: Function,
): void => {
  const id = uuid();
  const ext = path.extname(file.originalname);
  cb(null, `${id}${ext}`);
};

export const internshipDocsUpload = {
  upload: multer({
    fileFilter: wordPDFFileFilter,
    storage: diskStorage({
      destination: tmpFolder,
      filename: uuidFilename,
    }),
  }),
};

export const internshipWorkPLan = {
  upload: multer({
    fileFilter: wordPDFFileFilter,
    storage: diskStorage({
      destination: tmpFolder,
      filename: uuidFilename,
    }),
  }),
};
