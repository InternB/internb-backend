import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('calendars')
class Calendar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', array: true, nullable: false })
  starts_at: Date;

  @Column({ type: 'timestamp', array: true, nullable: false })
  finishes_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export default Calendar;
