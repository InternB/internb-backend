import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Discipline from './Discipline';

@Entity('classes')
class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  class: string;

  @Column()
  semester: string;

  @Column('integer')
  total_student_enrolled: number;

  @Column('integer')
  total_student_registered: number;

  @Column()
  pdf_guide: string;

  @Column()
  discipline_id: string;

  @Column()
  professor_id: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @ManyToOne(_ => Discipline, discipline => discipline.classes)
  discipline: Discipline;
}

export default Class;
