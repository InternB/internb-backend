import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CascadeOptionsAltered1598899487442
  implements MigrationInterface {
  name = 'CascadeOptionsAltered1598899487442';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "internships" DROP CONSTRAINT "FK_b7e38c9bf5592e974b47f3d2715"`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" DROP CONSTRAINT "FK_5a3fbc2507d7fa1dc6b324b74fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" DROP CONSTRAINT "FK_95f7644d775a098006d838cc8de"`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" DROP CONSTRAINT "FK_e233662d571b66327c1212f986f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" DROP CONSTRAINT "FK_26d1dc5119a5f3533249204c6b7"`,
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
      `ALTER TABLE "internships" ADD CONSTRAINT "FK_e233662d571b66327c1212f986f" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" ADD CONSTRAINT "FK_26d1dc5119a5f3533249204c6b7" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" ADD CONSTRAINT "FK_95f7644d775a098006d838cc8de" FOREIGN KEY ("assessment_id") REFERENCES "assessments"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" ADD CONSTRAINT "FK_5a3fbc2507d7fa1dc6b324b74fe" FOREIGN KEY ("calendar_id") REFERENCES "calendars"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" ADD CONSTRAINT "FK_b7e38c9bf5592e974b47f3d2715" FOREIGN KEY ("realization_id") REFERENCES "realizations"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "internships" DROP CONSTRAINT "FK_b7e38c9bf5592e974b47f3d2715"`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" DROP CONSTRAINT "FK_5a3fbc2507d7fa1dc6b324b74fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" DROP CONSTRAINT "FK_95f7644d775a098006d838cc8de"`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" DROP CONSTRAINT "FK_26d1dc5119a5f3533249204c6b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" DROP CONSTRAINT "FK_e233662d571b66327c1212f986f"`,
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
      `ALTER TABLE "internships" ADD CONSTRAINT "FK_26d1dc5119a5f3533249204c6b7" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" ADD CONSTRAINT "FK_e233662d571b66327c1212f986f" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" ADD CONSTRAINT "FK_95f7644d775a098006d838cc8de" FOREIGN KEY ("assessment_id") REFERENCES "assessments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" ADD CONSTRAINT "FK_5a3fbc2507d7fa1dc6b324b74fe" FOREIGN KEY ("calendar_id") REFERENCES "calendars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" ADD CONSTRAINT "FK_b7e38c9bf5592e974b47f3d2715" FOREIGN KEY ("realization_id") REFERENCES "realizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
