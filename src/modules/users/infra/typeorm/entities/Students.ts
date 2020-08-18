import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import User from './User';

@Entity('preceptors')
class Preceptor {
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  enrollment: number;

  @Column()
  semester: string;
}

export default Preceptor;
