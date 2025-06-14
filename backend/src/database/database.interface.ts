import { Injectable } from '@nestjs/common';

@Injectable()
export class Database {}

export enum DbType {
  POSTGRES = 'postgres',
  MONGO = 'mongo',
}

export interface DbModuleOptions {
  type: DbType;
  uri: string;
}
