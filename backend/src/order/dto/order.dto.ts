//TODO реализовать DTO для /orders
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class OrderDto {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsDateString()
  daytime: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;

  @IsNumber()
  price: number;
}

export class OrderRequestDto {
  email: string;
  phone: string;
  tickets: OrderDto[];
}

export class OrderResponseDto {
  total: number;
  items: OrderDto[];
}
