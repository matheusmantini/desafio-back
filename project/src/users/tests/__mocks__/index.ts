import { UserEntity } from "../../entities/user.entity";

export const usersEntityList: UserEntity[] = [
  {
    id: "1",
    name: "João",
    email: "joao@mail.com",
    password: "123456",
    address: "Rua dos limoeiros",
  },
  {
    id: "2",
    name: "Maria",
    email: "maria@mail.com",
    password: "654321",
    address: "Rua das rosas",
  },
  {
    id: "3",
    name: "José",
    email: "jose@mail.com",
    password: "123654",
    address: "Rua dos laranjais",
  },
];

export const updatedUserEntity = {
  id: "1",
  name: "João",
  email: "joao@mail.com",
  password: "123456@",
  address: "Rua dos limoeiros",
};
