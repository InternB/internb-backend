import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';

import AdmRegion from './AdmRegion';
import Internship from '../../../../disciplines/infra/typeorm/entities/Internship';

@Entity('schools')
class School {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('uuid')
  adm_region_id: string;

  @OneToOne(() => AdmRegion, { eager: true })
  @JoinColumn({ name: 'adm_region_id' })
  adm_region: AdmRegion;

  @Column()
  cep: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  interns: Internship[];
}

export default School;
