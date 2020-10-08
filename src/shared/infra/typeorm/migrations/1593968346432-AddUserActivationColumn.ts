import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddUserActivationColumn1593968346432
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'active',
        type: 'bool',
        isNullable: false,
        default: false,
      }),
      new TableColumn({
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
        default: null,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', [
      new TableColumn({ name: 'deleted_at', type: 'timestamp' }),
      new TableColumn({ name: 'active', type: 'bool' }),
    ]);
  }
}
