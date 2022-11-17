import { Test, TestingModule } from "@nestjs/testing";
import { itemsListEntityList } from "../../items-list/tests/__mocks__";
import { ItemsListRepository } from "../../items-list/items-list.repository";
import { UsersRepository } from "../../users/users.repository";
import { PurchasesRepository } from "../purchases.repository";
import { PurchasesService } from "../purchases.service";
import { usersEntityList } from "../../users/tests/__mocks__";
import { purchaseEntityList, purchaseFinalList } from "./__mocks__";

describe("PurchasesService", () => {
  let purchasesService: PurchasesService;
  let purchasesRepository: PurchasesRepository;
  let itemListRepository: ItemsListRepository;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchasesService,
        {
          provide: PurchasesRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue(purchaseEntityList),
            findOne: jest.fn().mockResolvedValue(purchaseEntityList[0]),
            create: jest.fn().mockResolvedValue(undefined),
            update: jest.fn().mockResolvedValue(undefined),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: ItemsListRepository,
          useValue: {
            findOne: jest.fn().mockResolvedValue(itemsListEntityList[0]),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: UsersRepository,
          useValue: {
            findOne: jest.fn().mockResolvedValue(usersEntityList[0]),
          },
        },
      ],
    }).compile();

    purchasesService = module.get<PurchasesService>(PurchasesService);
    purchasesRepository = module.get<PurchasesRepository>(PurchasesRepository);
    itemListRepository = module.get<ItemsListRepository>(ItemsListRepository);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it("should be defined", () => {
    expect(purchasesService).toBeDefined();
    expect(purchasesRepository).toBeDefined();
    expect(itemListRepository).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe("create", () => {
    it("should create a new purchase successfully", async () => {
      // Arrange
      const body = {
        id: "4",
        user_id: "4",
        total_price: 444.44,
        items_list_id: ["10", "11", "12"],
        purchase_date: new Date("2023-04-04"),
      };

      // Act
      const result = await purchasesService.create(body);

      // Assert
      expect(result).toBeUndefined();
    });

    it("should throw an exception if there's no user with informed user_id", async () => {
      // Arrange
      const body = {
        id: "4",
        user_id: "4",
        total_price: 444.44,
        items_list_id: ["10", "11", "12"],
        purchase_date: new Date("2023-04-04"),
      };

      jest.spyOn(usersRepository, "findOne").mockResolvedValueOnce(null);

      expect(purchasesService.create(body)).rejects.toThrowError();
    });

    it("should throw an exception if there's no item list with informed item_list_id", async () => {
      // Arrange
      const body = {
        id: "4",
        user_id: "4",
        total_price: 444.44,
        items_list_id: ["10", "11", "12"],
        purchase_date: new Date("2023-04-04"),
      };

      jest.spyOn(itemListRepository, "findOne").mockResolvedValueOnce(null);

      expect(purchasesService.create(body)).rejects.toThrowError();
    });

    it("should throw an exception", () => {
      // Arrange
      const body = {
        id: "4",
        user_id: "4",
        total_price: 444.44,
        items_list_id: ["10", "11", "12"],
        purchase_date: new Date("2023-04-04"),
      };

      jest
        .spyOn(purchasesRepository, "create")
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(purchasesService.create(body)).rejects.toThrowError();
    });
  });

  describe("findAll", () => {
    it("should return a purchases list successfully", async () => {
      // Act

      jest
        .spyOn(usersRepository, "findOne")
        .mockResolvedValueOnce(usersEntityList[0])
        .mockResolvedValueOnce(usersEntityList[1])
        .mockResolvedValue(usersEntityList[2]);

      jest
        .spyOn(itemListRepository, "findOne")
        .mockResolvedValueOnce(itemsListEntityList[0])
        .mockResolvedValueOnce(itemsListEntityList[1])
        .mockResolvedValue(itemsListEntityList[2]);

      const result = await purchasesService.findAll();

      expect(result).toEqual(purchaseFinalList);
      expect(typeof result).toEqual('object');
      expect(purchasesRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it("should throw an exception", () => {
      // Arrange
      jest
        .spyOn(purchasesRepository, "findAll")
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(purchasesService.findAll()).rejects.toThrowError();
    });
  });

  describe("findOne", () => {
    it("should return a purchase by its id successfully", async () => {
      // Act
      const result = await purchasesService.findOne("1");

      // Assert
      expect(result).toEqual(purchaseFinalList[0]);
      expect(purchasesRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it("should throw an exception if there's no purchase with informed id", async () => {
      jest.spyOn(purchasesRepository, "findOne").mockResolvedValueOnce(null);

      expect(purchasesService.findOne("1")).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should delete a purchase successfully', async () => {
      // Act
      const result = await purchasesService.remove('1');

      // Assert
      expect(result).toBeUndefined();
    });

    it("should throw an exception if there's no purchase with informed id", () => {
      // Arrange

      jest
        .spyOn(purchasesRepository, 'findOne')
        .mockResolvedValueOnce(undefined);

      // Assert
      expect(purchasesService.remove('1')).rejects.toThrowError();
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(purchasesRepository, 'delete')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(purchasesService.remove('1')).rejects.toThrowError();
    });
  });
});
