import IStorageProvider from '../model/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  public async saveFiles(files: string[]): Promise<string[]> {
    files.forEach(file => this.storage.push(file));
    return files;
  }

  public async deleteFile(file: string): Promise<void> {
    const idx = this.storage.findIndex(name => name === file);
    this.storage.splice(idx, 1);
  }

  public async deleteFiles(files: string[]): Promise<void> {
    files.forEach(file => {
      const idx = this.storage.findIndex(name => name === file);
      this.storage.splice(idx, 1);
    });
  }

  public async deleteTmpFiles(files: string[]): Promise<void> {
    files.forEach(file => {
      const idx = this.storage.findIndex(name => name === file);
      this.storage.splice(idx, 1);
    });
  }
}
