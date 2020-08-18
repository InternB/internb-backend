import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import User from './User';
import School from '../../../../schools/infra/typeorm/entities/School';

@Entity('preceptors')
class Preceptor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => School)
  @JoinColumn({ name: 'school_id' })
  school: School;

  @Column('smallint')
  experience: number;

  @Column()
  formation: string;
}

export default Preceptor;
