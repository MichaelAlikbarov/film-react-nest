import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmEntity } from '../films/films.entity';
import { ScheduleEntity } from '../films/schedule.entity';
import {
  IFilmRepository,
  IFilm,
  ISchedule,
} from './films.repository.interface';

@Injectable()
export class FilmsPostgresRepository implements IFilmRepository {
  constructor(
    @InjectRepository(FilmEntity) private filmRepo: Repository<FilmEntity>,
  ) {}

  async findAll(): Promise<IFilm[]> {
    const films = await this.filmRepo.find({ relations: ['schedule'] });
    console.log('test test');
    console.log(films);
    return films.map((film) => this.mapFilmEntityToFilm(film));
  }

  async findById(id: string): Promise<IFilm | null> {
    const film = await this.filmRepo.findOne({
      where: { id },
      relations: ['schedule'],
    });
    return film ? this.mapFilmEntityToFilm(film) : null;
  }

  async findScheduleItemById(id: string): Promise<ISchedule[] | null> {
    const film = await this.filmRepo.findOne({
      where: { id },
      relations: ['schedule'],
    });
    return (
      film?.schedule.map((s) => this.mapScheduleEntityToSchedule(s)) ?? null
    );
  }

  private mapFilmEntityToFilm(entity: FilmEntity): IFilm {
    return {
      id: entity.id,
      title: entity.title,
      rating: entity.rating,
      director: entity.director,
      tags: entity.tags,
      about: entity.about,
      description: entity.description,
      image: entity.image,
      cover: entity.cover,
      schedule: entity.schedule?.map((s) =>
        this.mapScheduleEntityToSchedule(s),
      ),
    };
  }

  private mapScheduleEntityToSchedule(entity: ScheduleEntity): ISchedule {
    return {
      id: entity.id,
      daytime: entity.daytime.toISOString(),
      hall: entity.hall,
      rows: entity.rows,
      seats: entity.seats,
      price: entity.price,
      taken: entity.taken,
    };
  }
}
