export default interface IGenericUsersRepository<TClass> {
  createUserOfType(tUser: TClass): Promise<TClass>;
  saveUserOfType(tUser: TClass): Promise<TClass>;
  findById(id: string): Promise<TClass | undefined>;
  findUserOfTypeById(id: string): Promise<TClass | undefined>;
}
