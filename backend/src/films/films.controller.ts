import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmListResponseDto, ScheduleListResponseDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAllFilms(): Promise<FilmListResponseDto> {
    const items = await this.filmsService.getAllFilms();
    const total = items.length;
    return {
      total,
      items,
    };
  }

  @Get(':id/schedule')
  async findSchedule(
    @Param('id') id: string,
  ): Promise<ScheduleListResponseDto> {
    const items = await this.filmsService.getFilmSchedule(id);
    const total = items.length;
    return {
      total,
      items,
    };
  }
}
