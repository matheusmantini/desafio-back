import { Test, TestingModule } from '@nestjs/testing';
import { ItemsListController } from './items-list.controller';
import { ItemsListService } from './items-list.service';

describe('ItemsListController', () => {
  let controller: ItemsListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsListController],
      providers: [ItemsListService],
    }).compile();

    controller = module.get<ItemsListController>(ItemsListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
