import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateActivity1598641657790 implements MigrationInterface {
  name = 'CreateActivity1598641657790';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "activities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "timestamp" TIMESTAMP NOT NULL, "sign" character varying(20) NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_7f4004429f731ffb9c88eb486a8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "intern_actvities" ("internship_id" uuid NOT NULL, "activity_id" uuid NOT NULL, CONSTRAINT "PK_f531110049527234fbf8e2086ef" PRIMARY KEY ("internship_id", "activity_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_66244e0ef4a9409d822196124c" ON "intern_actvities" ("internship_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bbc45e812114339f2da58c8adc" ON "intern_actvities" ("activity_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "intern_actvities" ADD CONSTRAINT "FK_66244e0ef4a9409d822196124c2" FOREIGN KEY ("internship_id") REFERENCES "internships"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "intern_actvities" ADD CONSTRAINT "FK_bbc45e812114339f2da58c8adc2" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "intern_actvities" DROP CONSTRAINT "FK_bbc45e812114339f2da58c8adc2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "intern_actvities" DROP CONSTRAINT "FK_66244e0ef4a9409d822196124c2"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_bbc45e812114339f2da58c8adc"`);
    await queryRunner.query(`DROP INDEX "IDX_66244e0ef4a9409d822196124c"`);
    await queryRunner.query(`DROP TABLE "intern_actvities"`);
    await queryRunner.query(`DROP TABLE "activities"`);
  }
}
