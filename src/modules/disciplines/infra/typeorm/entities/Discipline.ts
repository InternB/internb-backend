import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import Class from './Class';

@Entity('disciplines')
class Discipline {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Class, x => x.discipline, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  classes: Class[];
}

export default Discipline;
