import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";
config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 5432,
  username: process.env.DATABASE_USERNAME || "test",
  password: process.env.DATABASE_PASSWORD || "test",
  database: process.env.DATABASE_NAME || "test",
  synchronize: process.env.NODE_ENV === "development",
  // logging: process.env.NODE_ENV === "development",
  entities: ["src/**/*.entity{.ts,.js}"],
  migrations: ["src/migrations/**/*{.ts,.js}"],
  subscribers: [],
});
