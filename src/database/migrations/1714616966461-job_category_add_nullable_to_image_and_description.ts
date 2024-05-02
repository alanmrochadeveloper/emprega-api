import { MigrationInterface, QueryRunner } from "typeorm";

export class JobCategoryAddNullableToImageAndDescription1714616966461 implements MigrationInterface {
    name = 'JobCategoryAddNullableToImageAndDescription1714616966461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_category" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "job_category" ALTER COLUMN "imagePath" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "job_category" ALTER COLUMN "imageBuffer" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_category" ALTER COLUMN "imageBuffer" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "job_category" ALTER COLUMN "imagePath" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "job_category" ALTER COLUMN "description" SET NOT NULL`);
    }

}
