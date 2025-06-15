import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;

  const mockService = {
    getAllFilms: jest.fn().mockResolvedValue([]),
    getFilmSchedule: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return empty films list', async () => {
    const result = await controller.getAllFilms();

    expect(result).toEqual({ items: [], total: 0 });
    expect(mockService.getAllFilms).toHaveBeenCalled();
  });
});
