import { TypeOrmModuleOptions } from "@nestjs/typeorm";

console.log({ host: process.env.POSTGRES_HOST });
console.log({ port: process.env.POSTGRES_PORT });
console.log({ username: process.env.POSTGRES_USER });
console.log({ password: process.env.POSTGRES_PASSWORD });
console.log({ database: process.env.POSTGRES_DB });

export const typeormConfig = {
  type: "postgres",
  host: "emprega-99.cbuaoiimmoy2.sa-east-1.rds.amazonaws.com",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "99Emprega777",
  autoLoadEntities: true,
  synchronize: false,
  migrations: ["dist/migrations/*.js"],
  migrationsTableName: "migrations_history",
  migrationsRun: true,
  entities: ["dist/**/*.entity{.ts,.js}"],
  ssl: { rejectUnauthorized: false },
} as TypeOrmModuleOptions;
