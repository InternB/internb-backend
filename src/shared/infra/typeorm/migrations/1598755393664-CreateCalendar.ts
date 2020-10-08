import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateCalendar1598755393664 implements MigrationInterface {
  name = 'CreateCalendar1598755393664';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "calendars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "week_days" boolean array NOT NULL, "starts_at" TIMESTAMP array NOT NULL, "finishes_at" TIMESTAMP array NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_90dc0330e8ec9028e23c290dee8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "internships" ADD "calendar_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "internships" ADD CONSTRAINT "UQ_5a3fbc2507d7fa1dc6b324b74fe" UNIQUE ("calendar_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" ADD CONSTRAINT "FK_5a3fbc2507d7fa1dc6b324b74fe" FOREIGN KEY ("calendar_id") REFERENCES "calendars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "internships" DROP CONSTRAINT "FK_5a3fbc2507d7fa1dc6b324b74fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" DROP CONSTRAINT "UQ_5a3fbc2507d7fa1dc6b324b74fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" DROP COLUMN "calendar_id"`,
    );
    await queryRunner.query(`DROP TABLE "calendars"`);
  }
}
