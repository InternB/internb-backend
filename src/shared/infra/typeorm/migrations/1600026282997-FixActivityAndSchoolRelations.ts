import { MigrationInterface, QueryRunner } from 'typeorm';

export default class FixActivityAndSchoolRelations1600026282997
  implements MigrationInterface {
  name = 'FixActivityAndSchoolRelations1600026282997';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "activities" ADD "internship_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "schools" DROP CONSTRAINT "FK_8a33458aac8932c6097859d0c11"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schools" DROP CONSTRAINT "UQ_8a33458aac8932c6097859d0c11"`,
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
    await queryRunner.query(
      `ALTER TABLE "schools" ADD CONSTRAINT "FK_8a33458aac8932c6097859d0c11" FOREIGN KEY ("adm_region_id") REFERENCES "adm_regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "activities" ADD CONSTRAINT "FK_1ed8100b437041f3ef0c4bda28b" FOREIGN KEY ("internship_id") REFERENCES "internships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "activities" DROP CONSTRAINT "FK_1ed8100b437041f3ef0c4bda28b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schools" DROP CONSTRAINT "FK_8a33458aac8932c6097859d0c11"`,
    );
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
    await queryRunner.query(
      `ALTER TABLE "schools" ADD CONSTRAINT "UQ_8a33458aac8932c6097859d0c11" UNIQUE ("adm_region_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "schools" ADD CONSTRAINT "FK_8a33458aac8932c6097859d0c11" FOREIGN KEY ("adm_region_id") REFERENCES "adm_regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "activities" DROP COLUMN "internship_id"`,
    );
  }
}
