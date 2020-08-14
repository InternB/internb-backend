import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class AddStudentClass1597194774968
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'student_class',
        columns: [
          {
            name: 'student_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'class_id',
            type: 'varchar(5)',
            isNullable: false,
          },
          {
            name: 'class_discipline_id',
            type: 'varchar(10)',
            isNullable: false,
          },
          {
            name: 'class_professor_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_student',
            columnNames: ['student_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'fk_class',
            columnNames: [
              'class_id',
              'class_discipline_id',
              'class_professor_id',
            ],
            referencedColumnNames: ['id', 'discipline_id', 'professor_id'],
            referencedTableName: 'classes',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('student_class');
  }
}
