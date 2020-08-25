import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAssessment1598386479958
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'assessments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'class_plan',
            type: 'smallint[]',
            isNullable: false,
          },
          {
            name: 'class_plan_comments',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'content',
            type: 'smallint[]',
            isNullable: false,
          },
          {
            name: 'content_comments',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'class_experience',
            type: 'smallint[]',
            isNullable: false,
          },
          {
            name: 'class_experience_comments',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'methodology',
            type: 'smallint[]',
            isNullable: false,
          },
          {
            name: 'methodology_comments',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'didactic',
            type: 'smallint[]',
            isNullable: false,
          },
          {
            name: 'didactic_comments',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'rating',
            type: 'smallint[]',
            isNullable: false,
          },
          {
            name: 'rating_comments',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'communication',
            type: 'smallint[]',
            isNullable: false,
          },
          {
            name: 'communication_comments',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'general',
            type: 'smallint[]',
            isNullable: false,
          },
          {
            name: 'general_comments',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'internship_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'internship_student_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_internships',
            columnNames: ['internship_id', 'internship_student_id'],
            referencedColumnNames: ['id', 'student_id'],
            referencedTableName: 'internships',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('assessments');
  }
}
