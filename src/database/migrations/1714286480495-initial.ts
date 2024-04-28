import { CategoryEnum } from "src/category/category.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1714286480495 implements MigrationInterface {
  name = "Initial1714286480495";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."authorized_documents_status_enum" AS ENUM('pending', 'allowed', 'denied')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."authorized_documents_documenttype_enum" AS ENUM('cpf', 'cnpj')`
    );
    await queryRunner.query(
      `CREATE TABLE "authorized_documents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" "public"."authorized_documents_status_enum" NOT NULL DEFAULT 'pending', "document" character varying NOT NULL, "documentType" "public"."authorized_documents_documenttype_enum" NOT NULL, "company_id" uuid, CONSTRAINT "PK_b1336414f21b872e2ba8b371dab" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "job_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_15f44c4b9fbb84e28a0346e930f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."job_opportunity_model_enum" AS ENUM('remote', 'hybrid', 'on_site')`
    );
    await queryRunner.query(
      `CREATE TABLE "job_opportunity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying NOT NULL, "description" character varying NOT NULL, "requirements" character varying NOT NULL, "location" character varying NOT NULL, "benefits" character varying NOT NULL, "salary" numeric(10,2), "salary_range" json, "is_salary_to_be_agreed" boolean NOT NULL DEFAULT false, "model" "public"."job_opportunity_model_enum" NOT NULL DEFAULT 'on_site', "company_id" uuid, "category_id" uuid, CONSTRAINT "PK_861a005d96e8e3a5fbdbe2da209" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "trading_name" character varying(150) NOT NULL, "company_name" character varying(150) NOT NULL, "state_inscr" character varying(12) NOT NULL, "cnpj" character varying(14) NOT NULL, "employees_number" integer NOT NULL, "logo" character varying, "logo_file" bytea, CONSTRAINT "UQ_fa496bdd408b586c6867efc6fa3" UNIQUE ("state_inscr"), CONSTRAINT "UQ_b55d9c6e6adfa3c6de735c5a2eb" UNIQUE ("cnpj"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."category_value_enum" AS ENUM('Admin', 'Anunciante', 'Candidato')`
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "value" "public"."category_value_enum" NOT NULL, CONSTRAINT "UQ_4f0f3ecd39f846b48c0f7596f00" UNIQUE ("value"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `INSERT INTO "public"."category" ("value") VALUES ('${CategoryEnum.Admin}')`
    );
    await queryRunner.query(
      `INSERT INTO "public"."category" ("value") VALUES ('${CategoryEnum.Anunciante}')`
    );
    await queryRunner.query(
      `INSERT INTO "public"."category" ("value") VALUES ('${CategoryEnum.Candidato}')`
    );
    await queryRunner.query(
      `CREATE TABLE "person" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "first_name" character varying(100), "last_name" character varying(250), "address" character varying(250) NOT NULL, "birth_date" date, "cpf" character varying(11), "cnpj" character varying(14), "trading_name" character varying(150), "company_name" character varying(150), "state_inscr" character varying(12), "rg" character varying(11), "type" character varying NOT NULL, "phonenumber" character varying(50) NOT NULL, "phonenumber2" character varying(50), "resume_file_path" character varying(255), "resume_file_blob" bytea, "category_id" uuid, CONSTRAINT "UQ_264b7cad2330569e0ef5b4c39c4" UNIQUE ("cpf"), CONSTRAINT "UQ_c441b3fe81699a20d6ba507b1a8" UNIQUE ("cnpj"), CONSTRAINT "UQ_0b7866418431609fa1bafadbfc3" UNIQUE ("state_inscr"), CONSTRAINT "UQ_690554d08986f72266f0f0ff79d" UNIQUE ("rg"), CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "email" character varying NOT NULL, "email_confirmed" boolean NOT NULL DEFAULT false, "confirmation_token" character varying, "token_expires_date" TIMESTAMP WITH TIME ZONE, "avatar" character varying, "avatar_file" bytea, "password" character varying NOT NULL, "person_id" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_a4cee7e601d219733b064431fb" UNIQUE ("person_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "admin_email" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "email" character varying NOT NULL, CONSTRAINT "PK_1b91c6fa21ac4b2ea107ece5a7e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "admin_documents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "value" character varying NOT NULL, CONSTRAINT "PK_fe350ad348a3911a817842fce04" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "person_job_opportunity" ("person_id" uuid NOT NULL, "job_opportunity_id" uuid NOT NULL, CONSTRAINT "PK_33142e04e907e8b4748dd296b1e" PRIMARY KEY ("person_id", "job_opportunity_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f6ebc1c135c816c01626103a49" ON "person_job_opportunity" ("person_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a2ed10b94a0b0fedd13d1b1b91" ON "person_job_opportunity" ("job_opportunity_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "person_company" ("person_id" uuid NOT NULL, "company_id" uuid NOT NULL, CONSTRAINT "PK_d095e89ab33a7b4c250e1991945" PRIMARY KEY ("person_id", "company_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_69b4a66cc3b24c51267e2c4476" ON "person_company" ("person_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7f7af2f1efb2d43dfb0e145187" ON "person_company" ("company_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "authorized_documents" ADD CONSTRAINT "FK_4b6790cb18d79a64c83205700da" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job_opportunity" ADD CONSTRAINT "FK_310b2e8bc8fcd8e5880a071c154" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job_opportunity" ADD CONSTRAINT "FK_322a712088da1fe5fef7118da2b" FOREIGN KEY ("category_id") REFERENCES "job_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD CONSTRAINT "FK_4c04865d75d2764a07cec359a84" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_a4cee7e601d219733b064431fba" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "person_job_opportunity" ADD CONSTRAINT "FK_f6ebc1c135c816c01626103a491" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "person_job_opportunity" ADD CONSTRAINT "FK_a2ed10b94a0b0fedd13d1b1b91e" FOREIGN KEY ("job_opportunity_id") REFERENCES "job_opportunity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "person_company" ADD CONSTRAINT "FK_69b4a66cc3b24c51267e2c44768" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "person_company" ADD CONSTRAINT "FK_7f7af2f1efb2d43dfb0e1451877" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "person_company" DROP CONSTRAINT "FK_7f7af2f1efb2d43dfb0e1451877"`
    );
    await queryRunner.query(
      `ALTER TABLE "person_company" DROP CONSTRAINT "FK_69b4a66cc3b24c51267e2c44768"`
    );
    await queryRunner.query(
      `ALTER TABLE "person_job_opportunity" DROP CONSTRAINT "FK_a2ed10b94a0b0fedd13d1b1b91e"`
    );
    await queryRunner.query(
      `ALTER TABLE "person_job_opportunity" DROP CONSTRAINT "FK_f6ebc1c135c816c01626103a491"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_a4cee7e601d219733b064431fba"`
    );
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "FK_4c04865d75d2764a07cec359a84"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_opportunity" DROP CONSTRAINT "FK_322a712088da1fe5fef7118da2b"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_opportunity" DROP CONSTRAINT "FK_310b2e8bc8fcd8e5880a071c154"`
    );
    await queryRunner.query(
      `ALTER TABLE "authorized_documents" DROP CONSTRAINT "FK_4b6790cb18d79a64c83205700da"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7f7af2f1efb2d43dfb0e145187"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_69b4a66cc3b24c51267e2c4476"`
    );
    await queryRunner.query(`DROP TABLE "person_company"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a2ed10b94a0b0fedd13d1b1b91"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f6ebc1c135c816c01626103a49"`
    );
    await queryRunner.query(`DROP TABLE "person_job_opportunity"`);
    await queryRunner.query(`DROP TABLE "admin_documents"`);
    await queryRunner.query(`DROP TABLE "admin_email"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "person"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TYPE "public"."category_value_enum"`);
    await queryRunner.query(`DROP TABLE "company"`);
    await queryRunner.query(`DROP TABLE "job_opportunity"`);
    await queryRunner.query(`DROP TYPE "public"."job_opportunity_model_enum"`);
    await queryRunner.query(`DROP TABLE "job_category"`);
    await queryRunner.query(`DROP TABLE "authorized_documents"`);
    await queryRunner.query(
      `DROP TYPE "public"."authorized_documents_documenttype_enum"`
    );
    await queryRunner.query(
      `DROP TYPE "public"."authorized_documents_status_enum"`
    );
  }
}
