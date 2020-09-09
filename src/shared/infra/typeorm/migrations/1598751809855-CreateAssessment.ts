import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateAssessment1598751809855
  implements MigrationInterface {
  name = 'CreateAssessment1598751809855';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "assessments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "internship_id" uuid NOT NULL, "class_plan" smallint array NOT NULL, "class_plan_comments" text, "content" smallint array NOT NULL, "content_comments" text, "class_experience" smallint array NOT NULL, "class_experience_comments" text, "methodology" smallint array NOT NULL, "methodology_comments" text, "didactic" smallint array NOT NULL, "didactic_comments" text, "evaluation" smallint array NOT NULL, "evaluation_comments" text, "communication" smallint array NOT NULL, "communication_comments" text, "general" smallint array NOT NULL, "general_comments" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_a3442bd80a00e9111cefca57f6c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" ADD "assessment_id" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" ADD CONSTRAINT "UQ_95f7644d775a098006d838cc8de" UNIQUE ("assessment_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" ADD CONSTRAINT "FK_95f7644d775a098006d838cc8de" FOREIGN KEY ("assessment_id") REFERENCES "assessments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "internships" DROP CONSTRAINT "FK_95f7644d775a098006d838cc8de"`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" DROP CONSTRAINT "UQ_95f7644d775a098006d838cc8de"`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" DROP COLUMN "assessment_id"`,
    );
    await queryRunner.query(`DROP TABLE "assessments"`);
  }
}
