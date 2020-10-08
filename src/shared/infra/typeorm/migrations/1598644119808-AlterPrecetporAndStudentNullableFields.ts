import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterPrecetporAndStudentNullableFields1598644119808 implements MigrationInterface {
    name = 'AlterPrecetporAndStudentNullableFields1598644119808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "preceptors" ALTER COLUMN "experience" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "preceptors" DROP COLUMN "formation"`);
        await queryRunner.query(`ALTER TABLE "preceptors" ADD "formation" character varying(15)`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "semester" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "semester" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "preceptors" DROP COLUMN "formation"`);
        await queryRunner.query(`ALTER TABLE "preceptors" ADD "formation" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "preceptors" ALTER COLUMN "experience" SET NOT NULL`);
    }

}
