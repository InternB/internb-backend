export default interface IHashProvider {
  generate(payload: string, salt?: number): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
