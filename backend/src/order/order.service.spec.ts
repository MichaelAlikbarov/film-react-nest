import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FilmsPostgresRepository } from '../repository/films-postgres.repository';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const mockFilmsRepo = {
      findById: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: FilmsPostgresRepository,
          useValue: mockFilmsRepo,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
