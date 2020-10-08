export default interface IGenericUsersRepository<TClass> {
  createUserOfType(tUser: TClass): Promise<TClass>;
  saveUserOfType(tUser: TClass): Promise<TClass>;
  findById(id: string, eager?: boolean): Promise<TClass | undefined>;
  findUserOfTypeById(id: string): Promise<TClass | undefined>;
}
