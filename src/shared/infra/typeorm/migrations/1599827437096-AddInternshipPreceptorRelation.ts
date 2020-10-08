import {MigrationInterface, QueryRunner} from "typeorm";

export class AddInternshipPreceptorRelation1599827437096 implements MigrationInterface {
    name = 'AddInternshipPreceptorRelation1599827437096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calendars" ALTER COLUMN "starts_at" TYPE TIMESTAMP array`);
        await queryRunner.query(`ALTER TABLE "calendars" ALTER COLUMN "finishes_at" TYPE TIMESTAMP array`);
        await queryRunner.query(`ALTER TABLE "realizations" DROP COLUMN "names"`);
        await queryRunner.query(`ALTER TABLE "realizations" ADD "names" character varying(100) array`);
        await queryRunner.query(`ALTER TABLE "internships" ADD CONSTRAINT "FK_ec5164854eb95be6f513583bf50" FOREIGN KEY ("preceptor_id") REFERENCES "preceptors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "internships" DROP CONSTRAINT "FK_ec5164854eb95be6f513583bf50"`);
        await queryRunner.query(`ALTER TABLE "realizations" DROP COLUMN "names"`);
        await queryRunner.query(`ALTER TABLE "realizations" ADD "names" character varying array`);
        await queryRunner.query(`ALTER TABLE "calendars" ALTER COLUMN "finishes_at" TYPE TIMESTAMP array`);
        await queryRunner.query(`ALTER TABLE "calendars" ALTER COLUMN "starts_at" TYPE TIMESTAMP array`);
    }

}
