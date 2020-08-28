import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export default Activity;
