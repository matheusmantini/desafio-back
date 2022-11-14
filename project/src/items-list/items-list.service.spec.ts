import { Test, TestingModule } from '@nestjs/testing';
import { ItemsListService } from './items-list.service';

describe('ItemsListService', () => {
  let service: ItemsListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsListService],
    }).compile();

    service = module.get<ItemsListService>(ItemsListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
