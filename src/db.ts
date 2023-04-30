import { DataSource } from "typeorm";
import { config } from "dotenv";
import entities from "./Entities";
import subscribers from "./Entities/subscribers";

config();
const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: true,
  // dropSchema:true,
  entities,
  subscribers
});

export default AppDataSource;
