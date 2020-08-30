import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRealization1598756045502 implements MigrationInterface {
    name = 'CreateRealization1598756045502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "realizations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" smallint NOT NULL, "names" character varying(100) array, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_66797966eebab933c5fdb6d5919" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "internships" ADD "realization_id" uuid`);
        await queryRunner.query(`ALTER TABLE "internships" ADD CONSTRAINT "UQ_b7e38c9bf5592e974b47f3d2715" UNIQUE ("realization_id")`);
        await queryRunner.query(`ALTER TABLE "calendars" ALTER COLUMN "starts_at" TYPE TIMESTAMP array`);
        await queryRunner.query(`ALTER TABLE "calendars" ALTER COLUMN "finishes_at" TYPE TIMESTAMP array`);
        await queryRunner.query(`ALTER TABLE "internships" ADD CONSTRAINT "FK_b7e38c9bf5592e974b47f3d2715" FOREIGN KEY ("realization_id") REFERENCES "realizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "internships" DROP CONSTRAINT "FK_b7e38c9bf5592e974b47f3d2715"`);
        await queryRunner.query(`ALTER TABLE "calendars" ALTER COLUMN "finishes_at" TYPE TIMESTAMP array`);
        await queryRunner.query(`ALTER TABLE "calendars" ALTER COLUMN "starts_at" TYPE TIMESTAMP array`);
        await queryRunner.query(`ALTER TABLE "internships" DROP CONSTRAINT "UQ_b7e38c9bf5592e974b47f3d2715"`);
        await queryRunner.query(`ALTER TABLE "internships" DROP COLUMN "realization_id"`);
        await queryRunner.query(`DROP TABLE "realizations"`);
    }

}
