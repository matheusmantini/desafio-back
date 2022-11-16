import { Test, TestingModule } from '@nestjs/testing';
import { PurchasesController } from '../purchases.controller';
import { PurchasesService } from '../purchases.service';
import { purchaseEntityList } from './__mocks__';

describe('PurchasesController', () => {
  let purchasesController: PurchasesController;
  let purchasesService: PurchasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchasesController],
      providers: [{
        provide: PurchasesService,
        useValue: {
          create: jest.fn().mockResolvedValue(undefined),
          findAll: jest.fn().mockResolvedValue(purchaseEntityList),
          findOne: jest
            .fn()
            .mockResolvedValue(purchaseEntityList[0]),
          remove: jest.fn().mockResolvedValue(undefined),
        },
      },],
    }).compile();

    purchasesController = module.get<PurchasesController>(PurchasesController);
    purchasesService = module.get<PurchasesService>(PurchasesService);
  });

  it('should be defined', () => {
    expect(purchasesController).toBeDefined();
    expect(purchasesService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new purchase successfully', async () => {
      // Arrange
      const body = {
        id: '4',
        user_id: '4',
        total_price: 444.44,
        items_list_id: ['10', '11', '12'],
        purchase_date: new Date('2023-04-04'),
      };

      // Act
      const result = await purchasesController.create(body);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      const body = {
        id: '4',
        user_id: '4',
        total_price: 444.44,
        items_list_id: ['10', '11', '12'],
        purchase_date: new Date('2023-04-04'),
      };

      jest
        .spyOn(purchasesService, 'create')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(purchasesController.create(body)).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should return a purchases list successfully', async () => {
      // Act
      const result = await purchasesController.findAll();

      // Assert
      expect(result).toEqual(purchaseEntityList);
      expect(typeof result).toEqual('object');
      expect(purchasesService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(purchasesService, 'findAll')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(purchasesController.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a purchase by its id successfully', async () => {
      // Act
      const result = await purchasesController.findOne('1');

      // Assert
      expect(result).toEqual(purchaseEntityList[0]);
      expect(purchasesService.findOne).toHaveBeenCalledTimes(1);
      expect(purchasesService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(purchasesService, 'findOne')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(
        purchasesController.findOne('1'),
      ).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should delete a purchase successfully', async () => {
      // Act
      const result = await purchasesController.remove('1');

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(purchasesService, 'remove').mockRejectedValueOnce(new Error());

      // Assert
      expect(purchasesController.remove('1')).rejects.toThrowError();
    });
  });
});
