import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Discipline from './Discipline';

@Entity('classes')
class Class {
  @PrimaryColumn()
  id: string;

  @Column()
  semester: string;

  @Column('integer')
  total_students_enrolled: number;

  @Column('integer', { default: 0 })
  total_students_registered: number;

  @Column()
  pdf_guide: string;

  @Column()
  discipline_id: string;

  @ManyToOne(() => Discipline, discipline => discipline.classes)
  @JoinColumn({ name: 'discipline_id' })
  discipline: Discipline;

  @Column()
  professor_id: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export default Class;
