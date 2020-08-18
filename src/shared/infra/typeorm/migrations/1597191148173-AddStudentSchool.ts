import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class AddStudentSchool1597191148173
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'student_in_school',
        columns: [
          {
            name: 'student_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'school_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_intern',
            columnNames: ['student_id'],
            referencedColumnNames: ['user_id'],
            referencedTableName: 'students',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'fk_interns_at',
            columnNames: ['school_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'schools',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('student_in_school');
  }
}
