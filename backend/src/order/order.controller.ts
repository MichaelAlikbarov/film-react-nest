import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderRequestDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() body: Partial<OrderRequestDto>) {
    const createOrderDto = body.tickets;
    return await this.orderService.createOrder(createOrderDto);
  }
}
