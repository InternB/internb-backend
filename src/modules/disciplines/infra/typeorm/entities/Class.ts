import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import Discipline from './Discipline';
import Internship from './Internship';

@Entity('classes')
class Class {
  @PrimaryColumn()
  id: string;

  @Column()
  semester: string;

  @Column()
  @Exclude()
  password: string;

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
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Internship, x => x.class)
  internships: Internship[];
}

export default Class;
