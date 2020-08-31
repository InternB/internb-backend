import {
  Entity,
  PrimaryGeneratedColumn,
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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 5, nullable: false })
  sign: string;

  @Column({ type: 'varchar', length: 6, nullable: false })
  semester: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Exclude()
  password: string;

  @Column('smallint')
  total_students_enrolled: number;

  @Column('smallint', { default: 0 })
  total_students_registered: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  pdf_guide: string;

  @Column({ type: 'varchar', nullable: false })
  discipline_id: string;

  @ManyToOne(() => Discipline, discipline => discipline.classes)
  @JoinColumn({ name: 'discipline_id', referencedColumnName: 'id' })
  discipline: Discipline;

  @Column({ type: 'uuid', nullable: false })
  professor_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Internship, x => x.class)
  internships: Internship[];
}

export default Class;
