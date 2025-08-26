import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();
import Entities from "../entities"

export const AppDataSource = new DataSource({
  type: "mysql", 
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), 
  username: process.env.DB_USER, 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, 
  logging: false,
  entities: Object.values(Entities), // Import all entities from the entities directory
});

export const connectDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Error during database connection:", error);
  }
};
