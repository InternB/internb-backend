import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterUserPhoneColumn1590693242686
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'phone',
      new TableColumn({
        name: 'phone',
        type: 'varchar(20)',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'phone',
      new TableColumn({
        name: 'phone',
        type: 'varchar(20)',
        isNullable: false,
      }),
    );
  }
}
