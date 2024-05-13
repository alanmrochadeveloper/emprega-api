import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJobApplication1715580427917 implements MigrationInterface {
    name = 'AddJobApplication1715580427917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."job_application_applicationstatus_enum" AS ENUM('aplicado', 'rejeitado', 'entrevistado', 'ofertado', 'convidado', 'contratado', 'cancelado')`);
        await queryRunner.query(`CREATE TABLE "job_application" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "applicationStatus" "public"."job_application_applicationstatus_enum" NOT NULL, "job_opportunity_id" uuid, "person_id" uuid, CONSTRAINT "PK_c0b8f6b6341802967369b5d70f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "job_application" ADD CONSTRAINT "FK_5e372bdef8418f6ae122b3d6d91" FOREIGN KEY ("job_opportunity_id") REFERENCES "job_opportunity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_application" ADD CONSTRAINT "FK_3d46e0b5c09712c779ddb533557" FOREIGN KEY ("person_id") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_application" DROP CONSTRAINT "FK_3d46e0b5c09712c779ddb533557"`);
        await queryRunner.query(`ALTER TABLE "job_application" DROP CONSTRAINT "FK_5e372bdef8418f6ae122b3d6d91"`);
        await queryRunner.query(`DROP TABLE "job_application"`);
        await queryRunner.query(`DROP TYPE "public"."job_application_applicationstatus_enum"`);
    }

}
