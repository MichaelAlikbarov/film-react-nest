import { DynamicModule, Module } from '@nestjs/common';
import { DbType } from './database.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FilmEntity } from 'src/films/films.entity';
import { ScheduleEntity } from 'src/films/schedule.entity';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [ConfigModule, DatabaseModule.databaseProvider()],
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

  private static databaseProvider(): DynamicModule {
    const driver = DbType.POSTGRES;

    if (driver === DbType.POSTGRES) {
      return TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (config: ConfigService) => ({
          type: DbType.POSTGRES,
          url: config.get<string>('database.postgresUrl'),
          entities: [FilmEntity, ScheduleEntity],
          synchronize: false,
        }),
        inject: [ConfigService],
      });
    }

    throw new Error(`Unsupported DB driver: ${driver}`);
  }
}
