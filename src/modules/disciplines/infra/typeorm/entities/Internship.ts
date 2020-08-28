import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import Class from './Class';
import Student from '../../../../users/infra/typeorm/entities/Student';
import Activity from './Actvitity';

@Entity('internships')
class Internship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  student_id: string;

  @ManyToOne(() => Student, x => x.internships)
  @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
  student: Student;

  @Column({ type: 'uuid', nullable: false })
  class_id: string;

  @Column({ type: 'varchar', nullable: false })
  class_discipline_id: string;

  @Column({ type: 'uuid', nullable: false })
  class_professor_id: string;

  @Column({ type: 'uuid', nullable: true })
  preceptor_id: string;

  @ManyToOne(() => Class, x => x.internships)
  @JoinColumn({ name: 'class_id', referencedColumnName: 'id' })
  class: Class;

  @Column({ type: 'uuid', nullable: true })
  school_id: string;

  @Column({ type: 'timestamp', nullable: true })
  begins_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  finishes_at: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  compromise: string;

  @Column({ type: 'varchar', array: true, nullable: true })
  contract_files: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  work_plan: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  plan: string;

  @Column({ type: 'varchar', array: true, nullable: true })
  photos: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToMany(() => Activity)
  @JoinTable({
    name: 'intern_actvities',
    joinColumn: { name: 'internship_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'activity_id', referencedColumnName: 'id' },
  })
  activities: Activity[];
}

export default Internship;
