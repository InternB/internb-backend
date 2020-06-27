import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddUserContractFiles1593203484463
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'contract_files',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'contract_files');
  }
}
