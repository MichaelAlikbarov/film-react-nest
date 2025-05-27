import { DynamicModule, Module } from '@nestjs/common';
import { DbType } from './database.interface';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FilmEntity } from 'src/films/films.entity';
import { ScheduleEntity } from 'src/films/schedule.entity';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [ConfigModule.forRoot(), ...DatabaseModule.databaseProvider()],
      exports: [TypeOrmModule],
    };
  }

  static forFeature(entities): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [TypeOrmModule.forFeature(entities)],
      exports: [TypeOrmModule],
    };
  }

  private static databaseProvider(): DynamicModule[] {
    return [
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService): TypeOrmModuleOptions => {
          const driver = config.get<DbType>('database.driver');

          if (driver === DbType.POSTGRES) {
            return {
              type: 'postgres',
              url: config.get<string>('database.postgresUrl'),
              entities: [FilmEntity, ScheduleEntity],
              synchronize: false,
            };
          }

          if (driver === DbType.MONGO) {
            console.log('MongoDB support not implemented in this branch');
            throw new Error('MongoDB is not implemented in this branch');
          }

          throw new Error(`Unsupported DB driver: ${driver}`);
        },
      }),
    ];
  }
}
