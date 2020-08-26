import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import Student from '@modules/users/infra/typeorm/entities/Student';
import Class from './Class';
// import { Exclude } from 'class-transformer';

// import Discipline from './Discipline';

@Entity('internships')
class Internship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  student_id: string;

  @ManyToOne(() => Student, x => x.internships)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column()
  class_id: string;

  @Column()
  class_discipline_id: string;

  @Column()
  preceptor_id: string;

  @ManyToOne(() => Class, x => x.internships)
  @JoinColumn([
    { name: 'class_id' },
    { name: 'class_discipline_id' },
    { name: 'class_professor_id' },
  ])
  class: Class;

  @Column()
  school_id: string;

  @Column()
  begins_at: Date;

  @Column()
  finishes_at: Date;

  @Column()
  compromise: string;

  @Column()
  contract_files: string[];

  @Column()
  work_plan: string;

  @Column()
  plan: string;

  @Column()
  photos: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export default Internship;
