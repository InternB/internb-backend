import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';

import IStorageProvider from '../model/IStorageProvider';

export default class DiksStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    const extension = path.extname(file);

    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.folders[extension], file),
    );

    return file;
  }

  public async saveFiles(files: string[]): Promise<string[]> {
    const filesToSave: Promise<void>[] = [];

    files.forEach(file => {
      const extension = path.extname(file);

      filesToSave.push(
        fs.promises.rename(
          path.resolve(uploadConfig.tmpFolder, file),
          path.resolve(uploadConfig.folders[extension], file),
        ),
      );
    });

    await Promise.all(filesToSave);

    return files;
  }

  public async deleteFile(file: string): Promise<void> {
    const extension = path.extname(file);

    await fs.promises.unlink(
      path.resolve(uploadConfig.folders[extension], file),
    );
  }

  public async deleteFiles(files: string[]): Promise<void> {
    const filesToDelete: Promise<void>[] = [];

    files.forEach(file => {
      const extension = path.extname(file);

      filesToDelete.push(
        fs.promises.unlink(path.resolve(uploadConfig.folders[extension], file)),
      );
    });

    await Promise.all(filesToDelete);
  }

  public async deleteTmpFiles(files: string[]): Promise<void> {
    const filesToDelete: Promise<void>[] = [];

    files.forEach(file => {
      filesToDelete.push(
        fs.promises.unlink(path.resolve(uploadConfig.tmpFolder, file)),
      );
    });

    await Promise.all(filesToDelete);
  }
}
