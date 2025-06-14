import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderDto, OrderResponseDto } from './dto/order.dto';
import { FilmDto } from 'src/films/dto/films.dto';
import { FilmsPostgresRepository } from 'src/repository/films-postgres.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepo: FilmsPostgresRepository) {}
  async createOrder(tickets: OrderDto[]): Promise<OrderResponseDto> {
    const updatedFilms = new Map<string, FilmDto>();
    const orderTickets = [];

    for (const ticket of tickets) {
      const {
        film: filmId,
        session: sessionId,
        row,
        seat,
        price,
        daytime,
      } = ticket;
      const seatKey = `${row}:${seat}`;

      let film = updatedFilms.get(filmId);
      if (!film) {
        film = await this.filmsRepo.findById(filmId);
        if (!film) {
          throw new NotFoundException(`Фильм не найден: ${filmId}`);
        }
        updatedFilms.set(filmId, film);
      }

      const schedule = film.schedule.find((s) => s.id === sessionId);
      if (!schedule) {
        throw new NotFoundException(`Сеанс не найден: ${sessionId}`);
      }

      if (!Array.isArray(schedule.taken)) {
        schedule.taken = [];
      }

      if (schedule.taken.includes(seatKey)) {
        throw new ConflictException(`{ 'error': Место ${seatKey} занято }`);
      }

      schedule.taken.push(seatKey);

      orderTickets.push({
        film: filmId,
        session: sessionId,
        daytime,
        row,
        seat,
        price,
      });
    }

    return {
      total: orderTickets.length,
      items: orderTickets,
    };
  }
}
