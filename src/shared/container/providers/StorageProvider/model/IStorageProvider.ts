export default interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  saveFiles(files: string[]): Promise<string[]>;
  deleteFile(file: string): Promise<void>;
  deleteFiles(files: string[]): Promise<void>;
  deleteTmpFiles(files: string[]): Promise<void>;
}
