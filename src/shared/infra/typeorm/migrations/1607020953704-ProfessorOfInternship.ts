import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ProfessorOfInternship1607020953704
  implements MigrationInterface {
  name = 'ProfessorOfInternship1607020953704';

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
    await queryRunner.query(
      `ALTER TABLE "internships" ADD CONSTRAINT "FK_090d1bf5eccff48627baa558259" FOREIGN KEY ("class_professor_id") REFERENCES "professors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "internships" DROP CONSTRAINT "FK_090d1bf5eccff48627baa558259"`,
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
  }
}
