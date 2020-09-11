import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import User from './User';
import School from '../../../../schools/infra/typeorm/entities/School';
import Internship from '../../../../disciplines/infra/typeorm/entities/Internship';

@Entity('preceptors')
class Preceptor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'uuid', nullable: true })
  school_id: string;

  @OneToOne(() => School)
  @JoinColumn({ name: 'school_id' })
  school: School;

  @Column({ type: 'smallint', nullable: true })
  experience: number;

  @Column({ type: 'varchar', length: 15, nullable: true })
  formation: string;

  @OneToMany(() => Internship, x => x.preceptor)
  internships: Internship[];
}

export default Preceptor;
