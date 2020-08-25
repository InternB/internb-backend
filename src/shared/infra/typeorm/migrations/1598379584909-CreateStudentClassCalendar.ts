import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateStudentClassCalendar1598379584909
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'calendars',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'schedule',
            type: 'timestamp[]',
            isNullable: false,
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
    await queryRunner.dropTable('calendars');
  }
}
