import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class DropInternActivitiesTable1600026506738
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('intern_actvities');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'intern_actvities',
        columns: [
          {
            name: 'internship_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'activity_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_Internship',
            columnNames: ['internship_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'internships',
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_Activity',
            columnNames: ['activity_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'activities',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }
}
