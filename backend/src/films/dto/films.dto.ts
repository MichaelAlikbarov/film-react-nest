import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ScheduleDto {
  @IsNotEmpty()
  id: string;

  @IsDateString()
  daytime: string;

  @IsNotEmpty()
  hall: number;

  @IsNotEmpty()
  rows: number;

  @IsNotEmpty()
  seats: number;

  @IsNumber()
  price: number;

  @IsArray()
  @IsOptional()
  taken?: string[];
}

export class FilmDto {
  @IsNotEmpty()
  id: string;

  @IsNumber()
  rating: number;

  @IsNotEmpty()
  director: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsOptional()
  image?: string;

  @IsOptional()
  cover?: string;

  @IsNotEmpty()
  title: string;

  @IsOptional()
  about?: string;

  @IsOptional()
  description?: string;

  @IsArray()
  schedule: ScheduleDto[];
}

export class FilmListResponseDto {
  total: number;
  items: FilmDto[];
}

export class ScheduleListResponseDto {
  total: number;
  items: ScheduleDto[];
}
