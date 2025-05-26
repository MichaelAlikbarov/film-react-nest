import { DbType } from '../database/database.interface';

export const configuration = (): AppConfig => ({
  database: {
    driver: (process.env.DATABASE_DRIVER || DbType.POSTGRES) as DbType,
    postgresUrl: process.env.DATABASE_POSTGRES_URL,
    mongoUrl: process.env.DATABASE_MONGO_URL,
  },
});

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: DbType;
  postgresUrl?: string;
  mongoUrl?: string;
}
