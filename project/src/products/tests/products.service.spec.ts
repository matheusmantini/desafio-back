import { Test, TestingModule } from "@nestjs/testing";
import { ProductsRepository } from "../products.repository";
import { ProductsService } from "../products.service";
import { productsEntityList } from "./__mocks__";

describe("ProductsService", () => {
  let productsService: ProductsService;
  let productsRepository: ProductsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductsRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue(productsEntityList),
            findOne: jest.fn().mockResolvedValue(productsEntityList[0]),
            create: jest.fn().mockResolvedValue(undefined),
            update: jest.fn().mockResolvedValue(undefined),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
    productsRepository = module.get<ProductsRepository>(ProductsRepository);
  });

  it("should be defined", () => {
    expect(productsService).toBeDefined();
    expect(productsRepository).toBeDefined();
  });

  describe("findAll", () => {
    it("should return a products list successfully", async () => {
      // Act
      const result = await productsService.findAll();

      // Assert
      expect(result).toEqual(productsEntityList);
      expect(typeof result).toEqual("object");
      expect(productsRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it("should throw an exception", () => {
      // Arrange
      jest
        .spyOn(productsRepository, "findAll")
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(productsService.findAll()).rejects.toThrowError();
    });
  });

  describe("findOne", () => {
    it("should return a product by its id successfully", async () => {
      // Act
      const result = await productsService.findOne("1");

      // Assert
      expect(result).toEqual(productsEntityList[0]);
      expect(productsRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it("should throw an exception if there's no product with informed id", async () => {
      jest.spyOn(productsRepository, "findOne").mockResolvedValueOnce(null);

      expect(productsService.findOne("1")).rejects.toThrowError();
    });
  });

  describe("create", () => {
    it("should create a new product successfully", async () => {
      // Arrange
      const body = {
        id: "4",
        name: "Product 4",
        price: 4.44,
        image_url: "http://google.com/product4.png",
      };

      jest
        .spyOn(productsRepository, "findAll")
        .mockResolvedValueOnce(productsEntityList);

      // Act
      const result = await productsService.create(body);

      // Assert
      expect(result).toBeUndefined();
    });

    it("should throw an exception if name already exists", () => {
      // Arrange
      const body = {
        id: "1",
        name: "Product 1",
        price: 1.11,
        image_url: "http://google.com/product1.png",
      };

      jest
        .spyOn(productsRepository, "findAll")
        .mockResolvedValueOnce(productsEntityList);

      // Assert
      expect(productsService.create(body)).rejects.toThrowError();
    });

    it("should throw an exception if it didn't work at all", () => {
      // Arrange
      const body = {
        id: "4",
        name: "Product 4",
        price: 4.44,
        image_url: "http://google.com/product4.png",
      };

      jest
        .spyOn(productsRepository, "create")
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(productsService.create(body)).rejects.toThrowError();
    });
  });

  describe("update", () => {
    it("should update a product successfully", async () => {
      // Arrange
      const body = {
        price: 1111.11,
      };
      jest
        .spyOn(productsRepository, "findOne")
        .mockResolvedValueOnce(productsEntityList[0]);

      // Act
      const result = await productsService.update("1", body);

      // Assert
      expect(result).toBeUndefined();
    });

    it("should throw an exception if there's no product with informed id", () => {
      // Arrange
      const body = {
        price: 1111.11,
      };

      jest
        .spyOn(productsRepository, "findOne")
        .mockResolvedValueOnce(undefined);

      // Assert
      expect(productsService.update("1", body)).rejects.toThrowError();
    });

    it("should throw an exception if price or image_url are missing from body", async () => {
      // Assert
      try {
        await productsService.update('1', null);
      } catch (error) {
        expect(error.message).toEqual(
          "Choose at least one parameter: price or image_url"
        );
      }
    });

    it("should throw an exception if it didn't work at all", () => {
      // Arrange
      const body = {
        price: 1111.11,
      };
      jest.spyOn(productsRepository, "update").mockRejectedValueOnce(new Error());

      // Assert
      expect(productsService.update("1", body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should delete a product successfully', async () => {
      // Act
      const result = await productsService.remove('1');

      // Assert
      expect(result).toBeUndefined();
    });

    it("should throw an exception if there's no product with informed id", () => {
      // Arrange

      jest
        .spyOn(productsRepository, 'findOne')
        .mockResolvedValueOnce(undefined);

      // Assert
      expect(productsService.remove('1')).rejects.toThrowError();
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(productsRepository, 'delete')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(productsService.remove('1')).rejects.toThrowError();
    });
  });
});
