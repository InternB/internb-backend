import {
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import User from './User';
import Internship from '../../../../disciplines/infra/typeorm/entities/Internship';

@Entity('professors')
class Professor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Internship, x => x.class_professor)
  internships: Internship[];
}

export default Professor;
