import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersRepository } from "./users.repository";
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    create(createUserDto: CreateUserDto): Promise<void>;
    getFullAddress(cep: string): Promise<{
        cep: any;
        logradouro: any;
        complemento: any;
        bairro: any;
        cidade: any;
        estado: any;
    }>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Users[]>;
    findOne(id: string): Promise<import(".prisma/client").Users>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<void>;
}
