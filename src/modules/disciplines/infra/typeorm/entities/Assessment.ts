import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('assessments')
class Assessment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  internship_id: string;

  @Column({ type: 'boolean', nullable: false })
  ended: boolean;

  @Column({ type: 'smallint', array: true, nullable: false })
  class_plan: number[];

  @Column({ type: 'text', nullable: true })
  class_plan_comments: string;

  @Column({ type: 'smallint', array: true, nullable: false })
  content: number[];

  @Column({ type: 'text', nullable: true })
  content_comments: string;

  @Column({ type: 'smallint', array: true, nullable: false })
  class_experience: number[];

  @Column({ type: 'text', nullable: true })
  class_experience_comments: string;

  @Column({ type: 'smallint', array: true, nullable: false })
  methodology: number[];

  @Column({ type: 'text', nullable: true })
  methodology_comments: string;

  @Column({ type: 'smallint', array: true, nullable: false })
  didactic: number[];

  @Column({ type: 'text', nullable: true })
  didactic_comments: string;

  @Column({ type: 'smallint', array: true, nullable: false })
  evaluation: number[];

  @Column({ type: 'text', nullable: true })
  evaluation_comments: string;

  @Column({ type: 'smallint', array: true, nullable: false })
  communication: number[];

  @Column({ type: 'text', nullable: true })
  communication_comments: string;

  @Column({ type: 'smallint', array: true, nullable: false })
  general: number[];

  @Column({ type: 'text', nullable: true })
  general_comments: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;
}

export default Assessment;
