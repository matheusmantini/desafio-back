import { Test, TestingModule } from "@nestjs/testing";
import { ProductsRepository } from "../../products/products.repository";
import { productsEntityList } from "../../products/tests/__mocks__";
import { ItemsListRepository } from "../items-list.repository";
import { ItemsListService } from "../items-list.service";
import { itemsListEntityList } from "./__mocks__";

describe("ItemsListService", () => {
  let itemsListService: ItemsListService;
  let itemsListRepository: ItemsListRepository;
  let productsRepository: ProductsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsListService,
        {
          provide: ItemsListRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue(itemsListEntityList),
            findOne: jest.fn().mockResolvedValue(itemsListEntityList[0]),
            create: jest.fn().mockResolvedValue(undefined),
            update: jest.fn().mockResolvedValue(undefined),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: ProductsRepository,
          useValue: {
            findOne: jest.fn().mockResolvedValue(productsEntityList[0]),
          },
        },
      ],
    }).compile();

    itemsListService = module.get<ItemsListService>(ItemsListService);
    itemsListRepository = module.get<ItemsListRepository>(ItemsListRepository);
    productsRepository = module.get<ProductsRepository>(ProductsRepository);
  });

  it("should be defined", () => {
    expect(itemsListService).toBeDefined();
    expect(itemsListRepository).toBeDefined();
    expect(productsRepository).toBeDefined();
  });

  describe("create", () => {
    it("should create a new item list successfully", async () => {
      // Arrange
      const body = {
        id: '4',
        product_id: '4',
        product_price: 444.44,
        quantity: 44,
        product_name: 'Produto 4',
      };

      // Act
      const result = await itemsListService.create(body);

      // Assert
      expect(result).toBeUndefined();
    });

    it("should throw an exception if there's no product with informed id", async () => {
      // Arrange
      const body = {
        id: '4',
        product_id: '4',
        product_price: 444.44,
        quantity: 44,
        product_name: 'Produto 4',
      };
      
      jest.spyOn(productsRepository, "findOne").mockResolvedValueOnce(null);

      expect(itemsListService.create(body)).rejects.toThrowError();
    });

    it("should throw an exception if it didn't work at all", () => {
      // Arrange
      const body = {
        id: '4',
        product_id: '4',
        product_price: 444.44,
        quantity: 44,
        product_name: 'Produto 4',
      };

      jest
        .spyOn(itemsListRepository, "create")
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(itemsListService.create(body)).rejects.toThrowError();
    });
  });

  describe("findAll", () => {
    it("should return a list of items list successfully", async () => {
      // Act
      const result = await itemsListService.findAll();

      // Assert
      expect(result).toEqual(itemsListEntityList);
      expect(typeof result).toEqual("object");
      expect(itemsListRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it("should throw an exception", () => {
      // Arrange
      jest
        .spyOn(itemsListRepository, "findAll")
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(itemsListService.findAll()).rejects.toThrowError();
    });
  });

  describe("findOne", () => {
    it("should return an item list by its id successfully", async () => {
      // Act
      const result = await itemsListService.findOne("1");

      // Assert
      expect(result).toEqual(itemsListEntityList[0]);
      expect(itemsListRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it("should throw an exception if there's no item list with informed id", async () => {
      jest.spyOn(itemsListRepository, "findOne").mockResolvedValueOnce(null);

      expect(itemsListService.findOne("1")).rejects.toThrowError();
    });
  });

  describe("update", () => {
    it("should update an item list successfully", async () => {
      // Arrange
      const body = {
        quantity: 1,
      };
      jest
        .spyOn(itemsListRepository, "findOne")
        .mockResolvedValueOnce(itemsListEntityList[0]);

      // Act
      const result = await itemsListService.update("1", body);

      // Assert
      expect(result).toBeUndefined();
    });

    it("should throw an exception if there's no item list with informed id", () => {
      // Arrange
      const body = {
        quantity: 1,
      };

      jest
        .spyOn(itemsListRepository, "findOne")
        .mockResolvedValueOnce(undefined);

      // Assert
      expect(itemsListService.update("1", body)).rejects.toThrowError();
    });

    it("should throw an exception if it didn't work at all", () => {
      // Arrange
      const body = {
        quantity: 1,
      };
      jest.spyOn(itemsListRepository, "update").mockRejectedValueOnce(new Error());

      // Assert
      expect(itemsListService.update("1", body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should delete an item list successfully', async () => {
      // Act
      const result = await itemsListService.remove('1');

      // Assert
      expect(result).toBeUndefined();
    });

    it("should throw an exception if there's no item list with informed id", () => {
      // Arrange

      jest
        .spyOn(itemsListRepository, 'findOne')
        .mockResolvedValueOnce(undefined);

      // Assert
      expect(itemsListService.remove('1')).rejects.toThrowError();
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(itemsListRepository, 'delete')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(itemsListService.remove('1')).rejects.toThrowError();
    });
  });

});
