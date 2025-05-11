import { Injectable } from '@nestjs/common';
import { OrderDto, OrderResponseDto } from './dto/order.dto';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepo: FilmsRepository) {}
  async createOrder(tickets: OrderDto[]): Promise<OrderResponseDto> {
    const updatedFilms = new Map<string, any>();
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
          console.log(`Фильм не найден: ${filmId}`);
        }
        updatedFilms.set(filmId, film);
      }

      const schedule = film.schedule.find((s) => s.id === sessionId);
      if (!schedule) {
        console.log(`Сеанс не найден: ${sessionId}`);
      }

      if (!Array.isArray(schedule.taken)) {
        schedule.taken = [];
      }

      if (schedule.taken.includes(seatKey)) {
        console.log(`{ 'error': Место уже занято: ${seatKey} }`);
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
