import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersRepository } from "./users.repository";
import axios from "axios";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const registeredUsers = await this.usersRepository.findAll();

    for (let i = 0; i < registeredUsers.length; i++) {
      if (registeredUsers[i].email === createUserDto.email) {
        throw new ConflictException(
          `User with email '${registeredUsers[i].email}' already exists`
        );
      }
    }

    const address = await this.getFullAddress(createUserDto.zip_code);

    const newUser = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      address: `${address.logradouro}, ${createUserDto.address_number} - ${address.bairro}, ${address.cidade} - ${address.estado}, ${address.cep}`
    }
    
    try {
      await this.usersRepository.create(newUser);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async getFullAddress(cep: string) {
    try {
      const address = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      return {
        cep: address.data.cep,
        logradouro: address.data.logradouro,
        complemento: address.data.complemento,
        bairro: address.data.bairro,
        cidade: address.data.localidade,
        estado: address.data.uf,
      };
    } catch (error) {
      if ((error = "AxiosError: Request failed with status code 400")) {
        throw new BadRequestException(`cep '${cep}' is not valid`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`user with id '${id}' not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`user with id '${id}' not found`);
    }

    try {
      await this.usersRepository.update(id, updateUserDto);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
