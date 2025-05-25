import { Injectable } from '@nestjs/common';
import { FilmsRepository } from 'src/repository/films.repository';
import { FilmDto, ScheduleDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepo: FilmsRepository) {}

  async getAllFilms(): Promise<FilmDto[]> {
    await this.filmsRepo.findAll();
    const dataFilms = await this.filmsRepo.findAll();
    return dataFilms;
  }

  async getFilmSchedule(id: string): Promise<ScheduleDto[]> {
    return await this.filmsRepo.findScheduleItemById(id);
  }
}
