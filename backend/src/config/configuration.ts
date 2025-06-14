import { DbType } from '../database/database.interface';

export const configuration = (): AppConfig => ({
  database: {
    driver: process.env.DATABASE_DRIVER as DbType,
    postgresUrl: process.env.DATABASE_POSTGRES_URL,
    mongoUri: process.env.DATABASE_MONGO_URL,
  },
});

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: DbType;
  postgresUrl?: string;
  mongoUri?: string;
}
