import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddEndedColumnToAssessment1599764205472
  implements MigrationInterface {
  name = 'AddEndedColumnToAssessment1599764205472';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "assessments" ADD "ended" boolean NOT NULL`,
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
    await queryRunner.query(`ALTER TABLE "assessments" DROP COLUMN "ended"`);
  }
}
