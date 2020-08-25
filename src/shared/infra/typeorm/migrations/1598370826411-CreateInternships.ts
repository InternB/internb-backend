import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateInternships1598370826411
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('student_class');

    await queryRunner.createTable(
      new Table({
        name: 'internships',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
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
          {
            name: 'preceptor_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'school_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'begins_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'finishes_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'compromise',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'contract_files',
            type: 'varchar[]',
            isNullable: true,
          },
          {
            name: 'work_plan',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'plan',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'photos',
            type: 'varchar[]',
            isNullable: true,
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
            name: 'fk_student',
            columnNames: ['student_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'students',
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
          {
            name: 'fk_preceptor',
            columnNames: ['preceptor_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'students',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'fk_school',
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
    await queryRunner.dropTable('internships');

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
            referencedColumnNames: ['user_id'],
            referencedTableName: 'students',
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
}
