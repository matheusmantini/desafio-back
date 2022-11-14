import { Test, TestingModule } from '@nestjs/testing';
import { ItemsListController } from './items-list.controller';
import { ItemsListService } from './items-list.service';

describe('ItemsListController', () => {
  let itemsListController: ItemsListController;
  let itemsListService: ItemsListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsListController],
      providers: [
        {
          provide: ItemsListService,
          useValue: {
            create: jest.fn().mockResolvedValue(undefined),
            findAll: jest
              .fn()
              .mockResolvedValue(undefined),
              findOne: jest.fn().mockResolvedValue(undefined),
            update: jest.fn().mockResolvedValue(undefined),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    itemsListController = module.get<ItemsListController>(ItemsListController);
    itemsListService = module.get<ItemsListService>(ItemsListService);
  });

  it('should be defined', () => {
    expect(itemsListController).toBeDefined();
    expect(itemsListService).toBeDefined();
  });
});
