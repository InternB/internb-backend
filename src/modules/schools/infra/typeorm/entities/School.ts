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

@Entity('schools')
class School {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('uuid')
  adm_region_id: string;

  @OneToOne(() => AdmRegion)
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
}

export default School;
