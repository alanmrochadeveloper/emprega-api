import { DataSource } from "typeorm";

export const connectionSource = new DataSource({
  type: "postgres" as "postgres",
  host: "emprega-99-dev.cbuaoiimmoy2.sa-east-1.rds.amazonaws.com",
  port: 5432,
  username: "postgres",
  password: "99Emprega777",
  database: "emprega99",
  synchronize: false,
  migrations: [__dirname + "/../database/migrations/*.{ts,js}"],
  migrationsTableName: "migrations_history",
  migrationsRun: false,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  ssl: {
    rejectUnauthorized: false,
  },
});
