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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const products_repository_1 = require("./products.repository");
let ProductsService = class ProductsService {
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    async create(createProductDto) {
        const registeredProducts = await this.productsRepository.findAll();
        for (let i = 0; i < registeredProducts.length; i++) {
            if (registeredProducts[i].name === createProductDto.name) {
                throw new common_1.ConflictException(`Product with name '${registeredProducts[i].name}' already exists`);
            }
        }
        try {
            await this.productsRepository.create(createProductDto);
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException();
        }
    }
    findAll() {
        return this.productsRepository.findAll();
    }
    async findOne(id) {
        const product = await this.productsRepository.findOne(id);
        if (!product) {
            throw new common_1.NotFoundException(`product with id '${id}' not found`);
        }
        return product;
    }
    async update(id, updateProductDto) {
        const product = await this.productsRepository.findOne(id);
        if (!product) {
            throw new common_1.NotFoundException(`product with id '${id}' not found`);
        }
        try {
            await this.productsRepository.update(id, updateProductDto);
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async remove(id) {
        const product = await this.productsRepository.findOne(id);
        if (!product) {
            throw new common_1.NotFoundException(`product with id '${id}' not found`);
        }
        try {
            await this.productsRepository.delete(id);
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException();
        }
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_repository_1.ProductsRepository])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map