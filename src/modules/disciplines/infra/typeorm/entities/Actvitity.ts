import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Internship from './Internship';

@Entity('activities')
class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp')
  timestamp: Date;

  @Column({ type: 'varchar', length: 20, nullable: false })
  sign: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  photo: string;

  @Column({ type: 'uuid', nullable: false })
  internship_id: string;

  @ManyToOne(() => Internship, x => x.activities)
  @JoinColumn({ name: 'internship_id', referencedColumnName: 'id' })
  internship: Internship;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export default Activity;
