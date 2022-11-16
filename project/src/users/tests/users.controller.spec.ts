import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";
import { usersEntityList, updatedUserEntity } from "./__mocks__";

describe("UsersController", () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(undefined),
            findAll: jest.fn().mockResolvedValue(usersEntityList),
            findOne: jest.fn().mockResolvedValue(usersEntityList[0]),
            update: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe("create", () => {
    it("should create a new user successfully", async () => {
      // Arrange
      const body = {
        id: "4",
        name: "Paulo",
        email: "paulo@mail.com",
        password: "123456@",
        zip_code: "44444444",
        address_number: "44",
      };

      // Act
      const result = await usersController.create(body);

      // Assert
      expect(result).toBeUndefined();
    });

    it("should throw an exception", () => {
      // Arrange
      const body = {
        id: "4",
        name: "Paulo",
        email: "paulo@mail.com",
        password: "123456@",
        zip_code: "44444444",
        address_number: "44",
      };

      jest.spyOn(usersService, "create").mockRejectedValueOnce(new Error());

      // Assert
      expect(usersController.create(body)).rejects.toThrowError();
    });
  });

  describe("findAll", () => {
    it("should return a users list successfully", async () => {
      // Act
      const result = await usersController.findAll();

      // Assert
      expect(result).toEqual(usersEntityList);
      expect(typeof result).toEqual("object");
      expect(usersService.findAll).toHaveBeenCalledTimes(1);
    });

    it("should throw an exception", () => {
      // Arrange
      jest.spyOn(usersService, "findAll").mockRejectedValueOnce(new Error());

      // Assert
      expect(usersController.findAll()).rejects.toThrowError();
    });
  });

  describe("findOne", () => {
    it("should return a user by its id successfully", async () => {
      // Act
      const result = await usersController.findOne("1");

      // Assert
      expect(result).toEqual(usersEntityList[0]);
      expect(usersService.findOne).toHaveBeenCalledTimes(1);
      expect(usersService.findOne).toHaveBeenCalledWith("1");
    });

    it("should throw an exception", () => {
      // Arrange
      jest.spyOn(usersService, "findOne").mockRejectedValueOnce(new Error());

      // Assert
      expect(usersController.findOne("1")).rejects.toThrowError();
    });
  });

  describe("update", () => {
    it("should update a user's password successfully", async () => {
      // Arrange
      const body = {
        password: "123456@",
      };

      // Act
      const result = await usersController.update("1", body);

      // Assert
      expect(result).toBeUndefined();
    });

    it("should throw an exception", () => {
      // Arrange
      const body = {
        password: "123456@",
      };
      jest.spyOn(usersService, "update").mockRejectedValueOnce(new Error());

      // Assert
      expect(usersController.update("1", body)).rejects.toThrowError();
    });
  });
});
