import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import UserToken from './UserToken';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  cpf: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  @Exclude()
  password: string;

  @Column('varchar')
  fullname: string;

  @Column('varchar')
  phone: string;

  @Column('smallint')
  role: number;

  @Column('boolean')
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column('varchar', { default: 'default.png ' })
  avatar: string;

  @OneToMany(() => UserToken, userToken => userToken.user)
  userTokens: UserToken[];

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    return this.avatar
      ? `${process.env.APP_API_URL}/images/profiles/${this.avatar}`
      : null;
  }
}

export default User;
