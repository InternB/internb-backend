export default interface IGenericUsersRepository<TClass> {
  createUserOfType(tUser: TClass): Promise<void>;
  saveUserOfType(tUser: TClass): Promise<TClass>;
}
