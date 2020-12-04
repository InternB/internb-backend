import {
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import User from './User';
import Class from '../../../../disciplines/infra/typeorm/entities/Class';
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

  @OneToMany(() => Internship, internship => internship.class_professor)
  internships: Internship[];

  @OneToMany(() => Class, classes => classes.professor)
  classes: Class[];
}

export default Professor;
