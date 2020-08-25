import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateInternsActvities1598381753923
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'interns_activities',
        columns: [
          {
            name: 'activity_id',
            type: 'uuid',
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
        ],
        foreignKeys: [
          {
            name: 'fk_activity_id',
            columnNames: ['activity_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'activities',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
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
    await queryRunner.dropTable('interns_activities');
  }
}
