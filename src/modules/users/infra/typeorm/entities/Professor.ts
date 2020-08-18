import { Entity, OneToOne, JoinColumn } from 'typeorm';

import User from './User';

@Entity('professors')
class Professor {
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export default Professor;
