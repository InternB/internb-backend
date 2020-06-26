export default interface IStorageProvider {
  saveFile(extension: string, file: string): Promise<string>;
  saveFiles(extension: string, files: string[]): Promise<string[]>;
  deleteFile(extension: string, file: string): Promise<void>;
  deleteFiles(extension: string, files: string[]): Promise<void>;
  deleteTmpFiles(files: string[]): Promise<void>;
}
