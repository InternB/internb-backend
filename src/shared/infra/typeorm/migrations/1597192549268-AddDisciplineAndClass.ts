import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class AddDisciplineAndClass1597192549268
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'disciplines',
        columns: [
          {
            name: 'id',
            type: 'varchar(10)',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar(50)',
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
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'classes',
        columns: [
          {
            name: 'id',
            type: 'varchar(5)',
            isPrimary: true,
          },
          {
            name: 'semester',
            type: 'varchar(6)',
            isNullable: false,
          },
          {
            name: 'total_students_enrolled',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'total_students_registered',
            type: 'integer',
          },
          {
            name: 'pdf_guide',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'discipline_id',
            type: 'varchar(10)',
            isNullable: false,
          },
          {
            name: 'professor_id',
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
        ],
        foreignKeys: [
          {
            name: 'fk_professor',
            columnNames: ['professor_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'fk_discipline',
            columnNames: ['discipline_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'disciplines',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('classes');

    await queryRunner.dropTable('disciplines');
  }
}
