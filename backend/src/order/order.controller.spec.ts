import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRequestDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createOrder', () => {
    it('should call orderService.createOrder and return result', async () => {
      const tickets = [
        {
          film: 'film1',
          session: 'session1',
          row: 1,
          seat: 1,
          price: 100,
          daytime: '18:00',
        },
      ];

      const dto: Partial<OrderRequestDto> = { tickets };

      const expectedResult = {
        total: 1,
        items: tickets,
      };

      jest.spyOn(service, 'createOrder').mockResolvedValue(expectedResult);

      const result = await controller.createOrder(dto);

      expect(service.createOrder).toHaveBeenCalledWith(tickets);
      expect(result).toEqual(expectedResult);
    });
  });
});
