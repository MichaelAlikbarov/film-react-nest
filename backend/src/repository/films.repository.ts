import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument, ScheduleItem } from '../films/schema/film.schema';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async findAll(): Promise<Film[]> {
    return this.filmModel.find().exec();
  }

  async findById(id: string): Promise<Film> {
    const film = await this.filmModel.findOne({ id }).exec();
    return film;
  }

  async findScheduleItemById(id: string): Promise<ScheduleItem[]> {
    const film = await this.filmModel.findOne({ id }).exec();
    if (!film) return null;
    const schedule = film.schedule;
    return schedule;
  }
}
