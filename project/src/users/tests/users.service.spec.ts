import { Test, TestingModule } from "@nestjs/testing";
import axios from "axios";
import { UsersRepository } from "../users.repository";
import { UsersService } from "../users.service";
import { usersEntityList } from "./__mocks__";

describe("UsersService", () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue(usersEntityList),
            findOne: jest.fn().mockResolvedValue(usersEntityList[0]),
            create: jest.fn().mockResolvedValue(undefined),
            update: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it("should be defined", () => {
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe("findAll", () => {
    it("should return a products list successfully", async () => {
      // Act
      const result = await usersService.findAll();

      // Assert
      expect(result).toEqual(usersEntityList);
      expect(typeof result).toEqual("object");
      expect(usersRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it("should throw an exception", () => {
      // Arrange
      jest.spyOn(usersRepository, "findAll").mockRejectedValueOnce(new Error());

      // Assert
      expect(usersService.findAll()).rejects.toThrowError();
    });
  });

  describe("findOne", () => {
    it("should return a product by its id successfully", async () => {
      // Act
      const result = await usersService.findOne("1");

      // Assert
      expect(result).toEqual(usersEntityList[0]);
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it("should throw an exception if there's no product with informed id", async () => {
      jest.spyOn(usersRepository, "findOne").mockResolvedValueOnce(null);

      expect(usersService.findOne("1")).rejects.toThrowError();
    });
  });

  describe("create", () => {
    it("should create a new product successfully", async () => {
      // Arrange
      const body = {
        id: "4",
        name: "Paulo",
        email: "paulo@mail.com",
        password: "123456@",
        zip_code: "44444444",
        address_number: "44",
      };

      jest
        .spyOn(usersRepository, "findAll")
        .mockResolvedValueOnce(usersEntityList);

      // Act
      const result = await usersService.create(body);

      // Assert
      expect(result).toBeUndefined();
    });
  });

  describe("update", () => {
    it("should update a user password successfully", async () => {
      // Arrange
      const body = {
        password: "123456@",
      };
      jest
        .spyOn(usersRepository, "findOne")
        .mockResolvedValueOnce(usersEntityList[0]);

      // Act
      const result = await usersService.update("1", body);

      // Assert
      expect(result).toBeUndefined();
    });

    it("should throw an exception if there's no user with informed id", () => {
      // Arrange
      const body = {
        password: "123456@",
      };

      jest.spyOn(usersRepository, "findOne").mockResolvedValueOnce(undefined);

      // Assert
      expect(usersService.update("1", body)).rejects.toThrowError();
    });

    it("should throw an exception if it didn't work at all", () => {
      // Arrange
      const body = {
        password: "123456@",
      };
      jest.spyOn(usersRepository, "update").mockRejectedValueOnce(new Error());

      // Assert
      expect(usersService.update("1", body)).rejects.toThrowError();
    });
  });
});
