import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertAdminEmail1714368947674 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO admin_email (email) VALUES ('empregaamericana@gmail.com');
            INSERT INTO admin_email (email) VALUES ('alanmrochadeveloper@gmail.com');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM admin_email WHERE email IN ('empregaamericana@gmail.com', 'alanmrochadeveloper@gmail.com');
        `);
  }
}
