import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AlterActivityAndInternship1598880027468
  implements MigrationInterface {
  name = 'AlterActivityAndInternship1598880027468';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "internships" DROP COLUMN "plan"`);
    await queryRunner.query(`ALTER TABLE "internships" DROP COLUMN "photos"`);
    await queryRunner.query(
      `ALTER TABLE "activities" ADD "photo" character varying(255)`,
    );
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
    await queryRunner.query(`ALTER TABLE "activities" DROP COLUMN "photo"`);
    await queryRunner.query(
      `ALTER TABLE "internships" ADD "photos" character varying array`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" ADD "plan" character varying(100)`,
    );
  }
}
