import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../products.controller';
import { ProductsService } from '../products.service';
import { productsEntityList, updatedProductsEntity } from './__mocks__';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{
        provide: ProductsService,
        useValue: {
          create: jest.fn().mockResolvedValue(undefined),
          findAll: jest.fn().mockResolvedValue(productsEntityList),
          findOne: jest
            .fn()
            .mockResolvedValue(productsEntityList[0]),
          update: jest.fn().mockResolvedValue(updatedProductsEntity),
          remove: jest.fn().mockResolvedValue(undefined),
        },
      },],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productsController).toBeDefined();
    expect(productsService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product successfully', async () => {
      // Arrange
      const body = {
        id: '4',
        name: 'Product 4',
        price: 4.44,
        image_url: 'http://google.com/product-4.png',
      };

      // Act
      const result = await productsController.create(body);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      const body = {
        id: '4',
        name: 'Product 4',
        price: 4.44,
        image_url: 'http://google.com/product4.png',
      };

      jest
        .spyOn(productsService, 'create')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(productsController.create(body)).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should return a products list successfully', async () => {
      // Act
      const result = await productsController.findAll();

      // Assert
      expect(result).toEqual(productsEntityList);
      expect(typeof result).toEqual('object');
      expect(productsService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(productsService, 'findAll')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(productsController.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a product by its id successfully', async () => {
      // Act
      const result = await productsController.findOne('1');

      // Assert
      expect(result).toEqual(productsEntityList[0]);
      expect(productsService.findOne).toHaveBeenCalledTimes(1);
      expect(productsService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(productsService, 'findOne')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(
        productsController.findOne('1'),
      ).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a product successfully', async () => {
      // Arrange
      const body = {
        price: 1111.11,
      };

      // Act
      const result = await productsController.update('1', body);

      // Assert
      expect(result).toEqual(updatedProductsEntity);
    });

    it('should throw an exception', () => {
      // Arrange
      const body = {
        price: 1111.11,
      };
      jest
        .spyOn(productsService, 'update')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(
        productsController.update('1', body),
      ).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should delete a product successfully', async () => {
      // Act
      const result = await productsController.remove('1');

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(productsService, 'remove').mockRejectedValueOnce(new Error());

      // Assert
      expect(productsController.remove('1')).rejects.toThrowError();
    });
  });

});
