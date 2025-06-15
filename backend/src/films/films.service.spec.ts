import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmsPostgresRepository } from '../repository/films-postgres.repository';

describe('FilmsService', () => {
  let service: FilmsService;

  const mockRepo = {
    findAll: jest.fn().mockResolvedValue([]),
    findScheduleItemById: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: FilmsPostgresRepository,
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return empty array of films', async () => {
    const result = await service.getAllFilms();
    expect(result).toEqual([]);
    expect(mockRepo.findAll).toHaveBeenCalled();
  });
});
