export default interface IGenericUsersRepository<TClass> {
  createUserOfType(tUser: TClass): Promise<TClass>;
  saveUserOfType(tUser: TClass): Promise<TClass>;
  findUserOfTypeById(id: string): Promise<TClass | undefined>;
}
