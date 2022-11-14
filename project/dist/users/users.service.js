"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
const axios_1 = __importDefault(require("axios"));
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(createUserDto) {
        const registeredUsers = await this.usersRepository.findAll();
        for (let i = 0; i < registeredUsers.length; i++) {
            if (registeredUsers[i].email === createUserDto.email) {
                throw new common_1.ConflictException(`User with email '${registeredUsers[i].email}' already exists`);
            }
        }
        const address = await this.getFullAddress(createUserDto.zip_code);
        const newUser = {
            name: createUserDto.name,
            email: createUserDto.email,
            password: createUserDto.password,
            address: `${address.logradouro}, ${createUserDto.address_number} - ${address.bairro}, ${address.cidade} - ${address.estado}, ${address.cep}`
        };
        try {
            await this.usersRepository.create(newUser);
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async getFullAddress(cep) {
        try {
            const address = await axios_1.default.get(`https://viacep.com.br/ws/${cep}/json/`);
            return {
                cep: address.data.cep,
                logradouro: address.data.logradouro,
                complemento: address.data.complemento,
                bairro: address.data.bairro,
                cidade: address.data.localidade,
                estado: address.data.uf,
            };
        }
        catch (error) {
            if ((error = "AxiosError: Request failed with status code 400")) {
                throw new common_1.BadRequestException(`cep '${cep}' is not valid`);
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    findAll() {
        return this.usersRepository.findAll();
    }
    async findOne(id) {
        const user = await this.usersRepository.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException(`user with id '${id}' not found`);
        }
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.usersRepository.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException(`user with id '${id}' not found`);
        }
        try {
            await this.usersRepository.update(id, updateUserDto);
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException();
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map