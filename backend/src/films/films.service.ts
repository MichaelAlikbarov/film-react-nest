import { Injectable } from '@nestjs/common';
import { FilmDto, ScheduleDto } from './dto/films.dto';
import { FilmsPostgresRepository } from '../repository/films-postgres.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepo: FilmsPostgresRepository) {}

  async getAllFilms(): Promise<FilmDto[]> {
    await this.filmsRepo.findAll();
    const dataFilms = await this.filmsRepo.findAll();
    return dataFilms;
  }

  async getFilmSchedule(id: string): Promise<ScheduleDto[]> {
    return await this.filmsRepo.findScheduleItemById(id);
  }
}
