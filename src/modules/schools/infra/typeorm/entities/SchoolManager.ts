import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import School from './School';

@Entity('school_managers')
class SchoolManager {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role: number;

  @Column()
  fullname: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column('uuid')
  school_id: string;

  @OneToOne(() => School)
  @JoinColumn({ name: 'school_id' })
  school: School;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SchoolManager;
