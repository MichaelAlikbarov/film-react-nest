export interface IFilmRepository {
  findAll(): Promise<IFilm[]>;
  findById(id: string): Promise<IFilm | null>;
  findScheduleItemById(id: string): Promise<ISchedule[]>;
}

export interface IFilm {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  title: string;
  about?: string;
  description?: string;
  image?: string;
  cover?: string;
  schedule: ISchedule[];
}

export interface ISchedule {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}
