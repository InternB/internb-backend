import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('realizations')
class Realization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'smallint', nullable: false })
  type: number;

  @Column({ type: 'varchar', length: 100, array: true, nullable: true })
  names: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export default Realization;
