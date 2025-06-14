import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { DatabaseModule } from '../database/database.module';
import { FilmEntity } from './films.entity';
import { ScheduleEntity } from './schedule.entity';
import { FilmsPostgresRepository } from 'src/repository/films-postgres.repository';

@Module({
  imports: [DatabaseModule.forFeature([FilmEntity, ScheduleEntity])],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsPostgresRepository],
  exports: [FilmsPostgresRepository],
})
export class FilmsModule {}
