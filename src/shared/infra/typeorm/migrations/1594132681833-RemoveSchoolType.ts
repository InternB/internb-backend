import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RemoveSchoolType1594132681833
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('schools', 'type');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'schools',
      new TableColumn({
        name: 'type',
        type: 'integer',
        isNullable: false,
      }),
    );
  }
}
