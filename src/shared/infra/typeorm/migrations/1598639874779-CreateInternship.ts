import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateInternship1598639874779
  implements MigrationInterface {
  name = 'CreateInternship1598639874779';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schools" DROP CONSTRAINT "SchoolAdmRegion"`,
    );
    await queryRunner.query(
      `ALTER TABLE "preceptors" DROP CONSTRAINT "fk_user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "preceptors" DROP CONSTRAINT "fk_school_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "professors" DROP CONSTRAINT "fk_user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" DROP CONSTRAINT "fk_professor"`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" DROP CONSTRAINT "fk_discipline"`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "fk_user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tokens" DROP CONSTRAINT "TokenUser"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school_managers" DROP CONSTRAINT "WorksAtSchool"`,
    );
    await queryRunner.query(
      `CREATE TABLE "internships" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "student_id" uuid NOT NULL, "class_id" uuid NOT NULL, "class_discipline_id" character varying NOT NULL, "class_professor_id" uuid NOT NULL, "preceptor_id" uuid, "school_id" uuid, "begins_at" TIMESTAMP, "finishes_at" TIMESTAMP, "compromise" character varying(100), "contract_files" character varying array, "work_plan" character varying(100), "plan" character varying(100), "photos" character varying array, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_0a44e3c9dde1f2b92a4eb3c529f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "registration"`);
    await queryRunner.query(
      `ALTER TABLE "adm_regions" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" ADD "sign" character varying(5) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_230b925048540454c8b4c481e1c"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cpf"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "cpf" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "fullname"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "fullname" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "phone" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "active" DROP DEFAULT`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "avatar" character varying NOT NULL DEFAULT 'default.png '`,
    );
    await queryRunner.query(`ALTER TABLE "adm_regions" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "adm_regions" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "schools" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "schools" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "schools" ADD CONSTRAINT "UQ_8a33458aac8932c6097859d0c11" UNIQUE ("adm_region_id")`,
    );
    await queryRunner.query(`ALTER TABLE "schools" DROP COLUMN "cep"`);
    await queryRunner.query(
      `ALTER TABLE "schools" ADD "cep" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "schools" DROP COLUMN "address"`);
    await queryRunner.query(
      `ALTER TABLE "schools" ADD "address" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "schools" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "schools" ADD "phone" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "schools" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "schools" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "preceptors" ADD CONSTRAINT "UQ_43d31311c09cbaeac198842590f" UNIQUE ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "preceptors" ALTER COLUMN "experience" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "preceptors" DROP COLUMN "formation"`);
    await queryRunner.query(
      `ALTER TABLE "preceptors" ADD "formation" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "preceptors" ADD CONSTRAINT "UQ_26ad9e83a201f7e5a31d47e0a42" UNIQUE ("school_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "professors" ADD CONSTRAINT "UQ_66fb7f8de8d24c805ed641d1996" UNIQUE ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "disciplines" DROP CONSTRAINT "PK_9b25ea6da0741577a73c9e90aad"`,
    );
    await queryRunner.query(`ALTER TABLE "disciplines" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "disciplines" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "disciplines" ADD CONSTRAINT "PK_9b25ea6da0741577a73c9e90aad" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "disciplines" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "disciplines" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" DROP CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f"`,
    );
    await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "classes" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" ADD CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" DROP COLUMN "total_students_enrolled"`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" ADD "total_students_enrolled" smallint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" DROP COLUMN "total_students_registered"`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" ADD "total_students_registered" smallint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" DROP COLUMN "discipline_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" ADD "discipline_id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "UQ_fb3eff90b11bddf7285f9b4e281" UNIQUE ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ALTER COLUMN "semester" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "school_managers" DROP COLUMN "role"`);
    await queryRunner.query(
      `ALTER TABLE "school_managers" ADD "role" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "school_managers" DROP COLUMN "fullname"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school_managers" ADD "fullname" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "school_managers" DROP COLUMN "phone"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school_managers" ADD "phone" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "school_managers" DROP COLUMN "email"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school_managers" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "school_managers" ADD CONSTRAINT "UQ_a0014b4ed74a95e499bfa636ba9" UNIQUE ("school_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "schools" ADD CONSTRAINT "FK_8a33458aac8932c6097859d0c11" FOREIGN KEY ("adm_region_id") REFERENCES "adm_regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "preceptors" ADD CONSTRAINT "FK_43d31311c09cbaeac198842590f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "preceptors" ADD CONSTRAINT "FK_26ad9e83a201f7e5a31d47e0a42" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "professors" ADD CONSTRAINT "FK_66fb7f8de8d24c805ed641d1996" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" ADD CONSTRAINT "FK_44cc43fbbedf9e334b59185d94e" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" ADD CONSTRAINT "FK_e233662d571b66327c1212f986f" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" ADD CONSTRAINT "FK_26d1dc5119a5f3533249204c6b7" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "school_managers" ADD CONSTRAINT "FK_a0014b4ed74a95e499bfa636ba9" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "school_managers" DROP CONSTRAINT "FK_a0014b4ed74a95e499bfa636ba9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281"`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" DROP CONSTRAINT "FK_26d1dc5119a5f3533249204c6b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "internships" DROP CONSTRAINT "FK_e233662d571b66327c1212f986f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" DROP CONSTRAINT "FK_44cc43fbbedf9e334b59185d94e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "professors" DROP CONSTRAINT "FK_66fb7f8de8d24c805ed641d1996"`,
    );
    await queryRunner.query(
      `ALTER TABLE "preceptors" DROP CONSTRAINT "FK_26ad9e83a201f7e5a31d47e0a42"`,
    );
    await queryRunner.query(
      `ALTER TABLE "preceptors" DROP CONSTRAINT "FK_43d31311c09cbaeac198842590f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schools" DROP CONSTRAINT "FK_8a33458aac8932c6097859d0c11"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school_managers" DROP CONSTRAINT "UQ_a0014b4ed74a95e499bfa636ba9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school_managers" DROP COLUMN "email"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school_managers" ADD "email" character varying(100)`,
    );
    await queryRunner.query(
      `ALTER TABLE "school_managers" DROP COLUMN "phone"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school_managers" ADD "phone" character varying(20)`,
    );
    await queryRunner.query(
      `ALTER TABLE "school_managers" DROP COLUMN "fullname"`,
    );
    await queryRunner.query(
      `ALTER TABLE "school_managers" ADD "fullname" character varying(100) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "school_managers" DROP COLUMN "role"`);
    await queryRunner.query(
      `ALTER TABLE "school_managers" ADD "role" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ALTER COLUMN "semester" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "UQ_fb3eff90b11bddf7285f9b4e281"`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" DROP COLUMN "discipline_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" ADD "discipline_id" character varying(10) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" DROP COLUMN "total_students_registered"`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" ADD "total_students_registered" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" DROP COLUMN "total_students_enrolled"`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" ADD "total_students_enrolled" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" DROP CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f"`,
    );
    await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "classes" ADD "id" character varying(5) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" ADD CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "disciplines" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "disciplines" ADD "name" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "disciplines" DROP CONSTRAINT "PK_9b25ea6da0741577a73c9e90aad"`,
    );
    await queryRunner.query(`ALTER TABLE "disciplines" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "disciplines" ADD "id" character varying(10) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "disciplines" ADD CONSTRAINT "PK_9b25ea6da0741577a73c9e90aad" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "professors" DROP CONSTRAINT "UQ_66fb7f8de8d24c805ed641d1996"`,
    );
    await queryRunner.query(
      `ALTER TABLE "preceptors" DROP CONSTRAINT "UQ_26ad9e83a201f7e5a31d47e0a42"`,
    );
    await queryRunner.query(`ALTER TABLE "preceptors" DROP COLUMN "formation"`);
    await queryRunner.query(
      `ALTER TABLE "preceptors" ADD "formation" character varying(15)`,
    );
    await queryRunner.query(
      `ALTER TABLE "preceptors" ALTER COLUMN "experience" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "preceptors" DROP CONSTRAINT "UQ_43d31311c09cbaeac198842590f"`,
    );
    await queryRunner.query(`ALTER TABLE "schools" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "schools" ADD "email" character varying(100)`,
    );
    await queryRunner.query(`ALTER TABLE "schools" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "schools" ADD "phone" character varying(20)`,
    );
    await queryRunner.query(`ALTER TABLE "schools" DROP COLUMN "address"`);
    await queryRunner.query(
      `ALTER TABLE "schools" ADD "address" character varying(100) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "schools" DROP COLUMN "cep"`);
    await queryRunner.query(
      `ALTER TABLE "schools" ADD "cep" character varying(8) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "schools" DROP CONSTRAINT "UQ_8a33458aac8932c6097859d0c11"`,
    );
    await queryRunner.query(`ALTER TABLE "schools" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "schools" ADD "name" character varying(100) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "adm_regions" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "adm_regions" ADD "name" character varying(50) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "avatar" character varying(255) NOT NULL DEFAULT 'default.png'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "active" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 0`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "phone" character varying(20)`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "fullname"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "fullname" character varying(100) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" character varying(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "email" character varying(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cpf"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "cpf" character varying(11) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf")`,
    );
    await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "sign"`);
    await queryRunner.query(
      `ALTER TABLE "adm_regions" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "registration" character varying(10)`,
    );
    await queryRunner.query(`DROP TABLE "internships"`);
    await queryRunner.query(
      `ALTER TABLE "school_managers" ADD CONSTRAINT "WorksAtSchool" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tokens" ADD CONSTRAINT "TokenUser" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id", "user_id", "user_id") REFERENCES "users"("id","id","id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" ADD CONSTRAINT "fk_discipline" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "classes" ADD CONSTRAINT "fk_professor" FOREIGN KEY ("professor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "professors" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id", "user_id", "user_id") REFERENCES "users"("id","id","id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "preceptors" ADD CONSTRAINT "fk_school_id" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "preceptors" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id", "user_id", "user_id") REFERENCES "users"("id","id","id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "schools" ADD CONSTRAINT "SchoolAdmRegion" FOREIGN KEY ("adm_region_id") REFERENCES "adm_regions"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
