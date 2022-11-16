import { Test, TestingModule } from '@nestjs/testing';
import { ItemsListController } from '../items-list.controller';
import { ItemsListService } from '../items-list.service';
import { itemsListEntityList } from './__mocks__';

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
              .mockResolvedValue(itemsListEntityList),
              findOne: jest.fn().mockResolvedValue(itemsListEntityList[0]),
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

  describe('create', () => {
    it('should create a new item list successfully', async () => {
      // Arrange
      const body = {
        id: '4',
        product_id: '4',
        product_price: 444.44,
        quantity: 44,
        product_name: 'Produto 4',
      };

      // Act
      const result = await itemsListController.create(body);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      const body = {
        id: '4',
        product_id: '4',
        product_price: 444.44,
        quantity: 44,
        product_name: 'Produto 4',
      };

      jest
        .spyOn(itemsListService, 'create')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(itemsListController.create(body)).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should return a list of items list successfully', async () => {
      // Act
      const result = await itemsListController.findAll();

      // Assert
      expect(result).toEqual(itemsListEntityList);
      expect(typeof result).toEqual('object');
      expect(itemsListService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(itemsListService, 'findAll')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(itemsListController.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return an item list by its id successfully', async () => {
      // Act
      const result = await itemsListController.findOne('1');

      // Assert
      expect(result).toEqual(itemsListEntityList[0]);
      expect(itemsListService.findOne).toHaveBeenCalledTimes(1);
      expect(itemsListService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(itemsListService, 'findOne')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(
        itemsListController.findOne('1'),
      ).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update an item list successfully', async () => {
      // Arrange
      const body = {
        quantity: 1,
      };

      // Act
      const result = await itemsListController.update('1', body);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      const body = {
        quantity: 1,
      };
      jest
        .spyOn(itemsListService, 'update')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(
        itemsListController.update('1', body),
      ).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should delete an item list successfully', async () => {
      // Act
      const result = await itemsListController.remove('1');

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(itemsListService, 'remove').mockRejectedValueOnce(new Error());

      // Assert
      expect(itemsListController.remove('1')).rejects.toThrowError();
    });
  });
});
