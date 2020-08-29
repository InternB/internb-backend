import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import User from './User';
import Internship from '../../../../disciplines/infra/typeorm/entities/Internship';

@Entity('students')
class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 10, nullable: true })
  enrollment: string;

  @Column({ type: 'varchar', length: 6, nullable: true })
  semester: string;

  @OneToMany(() => Internship, x => x.student, { cascade: true })
  internships: Internship[];
}

export default Student;
