import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import Internship from '@modules/disciplines/infra/typeorm/entities/Internship';
import User from './User';

@Entity('students')
class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  enrollment: number;

  @Column()
  semester: string;

  @OneToMany(() => Internship, x => x.student)
  internships: Internship[];
}

export default Student;
