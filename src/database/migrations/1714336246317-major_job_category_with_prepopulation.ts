import { MigrationInterface, QueryRunner } from "typeorm";

export class MajorJobCategoryWithPrepopulation1714336246317
  implements MigrationInterface
{
  name = "MajorJobCategoryWithPrepopulation1714336246317";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."major_job_category_value_enum" AS ENUM('Administrativo', 'Comercial', 'Financeiro', 'Recursos Humanos', 'Tecnologia', 'Marketing', 'Serviços Gerais', 'Saúde', 'Educação', 'Engenharia', 'Jurídico')`
    );
    await queryRunner.query(
      `CREATE TABLE "major_job_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "value" "public"."major_job_category_value_enum" NOT NULL, "imagePath" character varying, "imageBuffer" bytea, CONSTRAINT "PK_6c51e76bc4a243c9f7338c3650e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`
      INSERT INTO "major_job_category" ("value", "imagePath") 
      VALUES 
        ('Administrativo', 'https://blog.singularityubrazil.com/wp-content/uploads/2023/03/gestao-administrativa-1200x900.jpg'),
        ('Comercial', 'https://profissoes.vagas.com.br/wp-content/uploads/2019/10/quais-sao-as-vantagens-e-dificuldades-de-trabalhar-na-area-comercial-scaled.jpg'),
        ('Financeiro', 'https://einvestidor.estadao.com.br/wp-content/uploads/2022/11/trader_011120221603.jpg'),
        ('Recursos Humanos', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaMXT79EZmA_0k8HT5d0x2FQ0SyYNjshDPKXhSOdS_hBjiEURZ81WTz4lwctbt7drLaqA&usqp=CAU'),
        ('Tecnologia', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMNQo3q6ptZ-UojgraPCyxMIKQX7iniN9MfM_N1R0MmdHvy_XZdiErq-jnr3X4khfpR0w&usqp=CAU'),
        ('Marketing', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk5drfJ0AaPGfG9pVQXU8eUwtvOC9O2_-TYQ&s'),
        ('Serviços Gerais', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThPAWkz9s9bOhWn_djabDoqRGeV4GMvMzhDHmkf6qeIg&s'),
        ('Saúde', 'https://images02.brasildefato.com.br/afeebc9f22fb02b5e2f955c407039da4.jpeg'),
        ('Educação', 'https://www.selecoes.com.br/media/_versions/2023/10/homenagem-para-professora_widelg.jpg'),
        ('Engenharia', 'https://guiadoestudante.abril.com.br/wp-content/uploads/sites/4/2016/12/engenharia.jpg?quality=100&strip=info&w=849'),
        ('Jurídico', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDeT_K352_sIAHrK3U1yukllh6BN0l94cQ5A&s')
    `);
    await queryRunner.query(
      `ALTER TABLE "job_category" ADD "description" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "job_category" ADD "imagePath" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "job_category" ADD "imageBuffer" bytea NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "job_category" ADD "major_job_category_id" uuid`
    );
    await queryRunner.query(
      `ALTER TABLE "job_category" ADD CONSTRAINT "FK_9431e57436d6c4c0bed7c9abda3" FOREIGN KEY ("major_job_category_id") REFERENCES "major_job_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "job_category" DROP CONSTRAINT "FK_9431e57436d6c4c0bed7c9abda3"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_category" DROP COLUMN "major_job_category_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_category" DROP COLUMN "imageBuffer"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_category" DROP COLUMN "imagePath"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_category" DROP COLUMN "description"`
    );
    await queryRunner.query(`DROP TABLE "major_job_category"`);
    await queryRunner.query(
      `DROP TYPE "public"."major_job_category_value_enum"`
    );
  }
}
