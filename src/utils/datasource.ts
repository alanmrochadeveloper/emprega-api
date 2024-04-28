import { config } from "dotenv";
import { resolve } from "path";
import { DataSource } from "typeorm";

config({
  path: [
    resolve(__dirname, "../../.env.local"),
    resolve(__dirname, "../../.env.development"),
    resolve(__dirname, "../../.env.production"),
  ],
});

console.log({
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT || "5432"),
});

export const connectionSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION as "postgres",
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT || "5432"),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  // synchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
  synchronize: false,
  migrations: [__dirname + "/../database/migrations/*.{ts,js}"],
  migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME,
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === "true",
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  ssl: {
    rejectUnauthorized: process.env.TYPEORM_SSL_REJECT_UNAUTHORIZED === "true",
  },
});

// ("emprega-99-dev.cbuaoiimmoy2.sa-east-1.rds.amazonaws.com");
// export const connectionSource = new DataSource({
//   type: "postgres",
//   host: "emprega-99-dev.cbuaoiimmoy2.sa-east-1.rds.amazonaws.com",
//   port: 5432,
//   username: "postgres",
//   password: "99Emprega777",
//   database: "postgres",
//   synchronize: false,
//   logging: true,
//   migrations: ["dist/migrations/*.js"],
//   migrationsTableName: "migrations_history",
//   migrationsRun: false,
//   entities: ["dist/**/*.entity{.ts,.js}"],
//   ssl: { rejectUnauthorized: false },
// });
