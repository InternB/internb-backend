import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSchool1592348257044 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'schools',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'type',
            type: 'smallint',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'adm_region_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'cep',
            type: 'varchar(8)',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'varchar(20)',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar(100)',
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
        ],
        foreignKeys: [
          {
            name: 'SchoolAdmRegion',
            columnNames: ['adm_region_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'adm_regions',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('schools');
  }
}
