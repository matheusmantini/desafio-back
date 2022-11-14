import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersRepository } from "./users.repository";

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

    try {
      await this.usersRepository.create(createUserDto);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);

    if(!user){
      throw new NotFoundException(`user with id '${id}' not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const user = await this.usersRepository.findOne(id);

    if(!user){
      throw new NotFoundException(`user with id '${id}' not found`);
    }

    try {
      await this.usersRepository.update(id, updateUserDto);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
