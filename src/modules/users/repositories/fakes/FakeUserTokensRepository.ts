import { v4 } from 'uuid';

import UserToken from '../../infra/typeorm/entities/UserToken';
import IUserTokensRepository from '../IUserTokensRepository';

export default class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: v4(),
      token: v4(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const findToken = this.userTokens.find(
      userToken => userToken.token === token,
    );
    return findToken;
  }
}
