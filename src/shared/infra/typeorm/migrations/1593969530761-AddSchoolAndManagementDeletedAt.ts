import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddSchoolAndManagementDeletedAt1593969530761
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'schools',
      new TableColumn({
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'school_managers',
      new TableColumn({
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('school_managers', 'deleted_at');

    await queryRunner.dropColumn('schools', 'deleted_at');
  }
}
