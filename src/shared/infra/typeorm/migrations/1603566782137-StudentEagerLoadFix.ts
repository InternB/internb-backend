import { MigrationInterface, QueryRunner } from 'typeorm';

export default class StudentEagerLoadFix1603566782137
  implements MigrationInterface {
  name = 'StudentEagerLoadFix1603566782137';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "calendars" ALTER COLUMN "starts_at" TYPE TIMESTAMP array`,
    );
    await queryRunner.query(
      `ALTER TABLE "calendars" ALTER COLUMN "finishes_at" TYPE TIMESTAMP array`,
    );
    await queryRunner.query(`ALTER TABLE "realizations" DROP COLUMN "names"`);
    await queryRunner.query(
      `ALTER TABLE "realizations" ADD "names" character varying(100) array`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "realizations" DROP COLUMN "names"`);
    await queryRunner.query(
      `ALTER TABLE "realizations" ADD "names" character varying array`,
    );
    await queryRunner.query(
      `ALTER TABLE "calendars" ALTER COLUMN "finishes_at" TYPE TIMESTAMP array`,
    );
    await queryRunner.query(
      `ALTER TABLE "calendars" ALTER COLUMN "starts_at" TYPE TIMESTAMP array`,
    );
  }
}
