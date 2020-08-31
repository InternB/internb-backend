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
  OneToOne,
} from 'typeorm';

import Class from './Class';
import Student from '../../../../users/infra/typeorm/entities/Student';
import Activity from './Actvitity';
import Assessment from './Assessment';
import Calendar from './Calendar';
import Realization from './Realization';

@Entity('internships')
class Internship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  student_id: string;

  @ManyToOne(() => Student, x => x.internships, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
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

  @ManyToOne(() => Class, x => x.internships, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
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
  contract_files: string[];

  @Column({ type: 'varchar', length: 100, nullable: true })
  work_plan: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToMany(() => Activity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinTable({
    name: 'intern_actvities',
    joinColumn: { name: 'internship_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'activity_id', referencedColumnName: 'id' },
  })
  activities: Activity[];

  @Column({ type: 'uuid', nullable: true })
  assessment_id: string;

  @OneToOne(() => Assessment, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'assessment_id', referencedColumnName: 'id' })
  asssessment: Assessment;

  @Column({ type: 'uuid', nullable: true })
  calendar_id: string;

  @OneToOne(() => Calendar, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'calendar_id', referencedColumnName: 'id' })
  calendar: Calendar;

  @Column({ type: 'uuid', nullable: true })
  realization_id: string;

  @OneToOne(() => Realization, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'realization_id', referencedColumnName: 'id' })
  realization: Realization;
}

export default Internship;
