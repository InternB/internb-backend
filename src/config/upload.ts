import path from 'path';
import { uuid } from 'uuidv4';
import { Request } from 'express';
import multer, { diskStorage } from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const profilesFolder = path.resolve(tmpFolder, 'images', 'profiles');

interface IIntershipFormats {
  [key: string]: boolean;
}

interface IFolders {
  tmpFolder: string;
  profilesFolder: string;
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

const imageFormats: IIntershipFormats = {
  '.jpg': true,
  '.jpeg': true,
  '.png': true,
};

export default {
  tmpFolder,
  profilesFolder,
  folders: {
    '.pdf': path.resolve(__dirname, tmpFolder, 'pdfs'),
    '.doc': path.resolve(__dirname, tmpFolder, 'docs'),
    '.odt': path.resolve(__dirname, tmpFolder, 'docs'),
    '.docx': path.resolve(__dirname, tmpFolder, 'docs'),
    '.jpg': path.resolve(__dirname, tmpFolder, 'images', 'profiles'),
    '.jpeg': path.resolve(__dirname, tmpFolder, 'images', 'profiles'),
    '.png': path.resolve(__dirname, tmpFolder, 'images', 'profiles'),
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

const imageFileFilter = (
  _: Request,
  file: Express.Multer.File,
  cb: Function,
): Function => {
  if (!imageFormats[`${path.extname(file.originalname)}`])
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

export const internshipWorkPlan = {
  upload: multer({
    fileFilter: wordPDFFileFilter,
    storage: diskStorage({
      destination: tmpFolder,
      filename: uuidFilename,
    }),
  }),
};

export const userAvatar = {
  upload: multer({
    fileFilter: imageFileFilter,
    storage: diskStorage({
      destination: tmpFolder,
      filename: uuidFilename,
    }),
  }),
};
