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
exports.ItemsListService = void 0;
const common_1 = require("@nestjs/common");
const products_repository_1 = require("../products/products.repository");
const items_list_repository_1 = require("./items-list.repository");
let ItemsListService = class ItemsListService {
    constructor(itemsListRepository, productsRepository) {
        this.itemsListRepository = itemsListRepository;
        this.productsRepository = productsRepository;
    }
    async create(createItemsListDto) {
        const product = await this.productsRepository.findOne(createItemsListDto.product_id);
        if (!product) {
            throw new common_1.NotFoundException(`product with id '${createItemsListDto.product_id}' not found`);
        }
        const body = {
            product_id: createItemsListDto.product_id,
            product_name: product.name,
            product_price: product.price,
            quantity: createItemsListDto.quantity,
        };
        try {
            await this.itemsListRepository.create(body);
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException();
        }
    }
    findAll() {
        return this.itemsListRepository.findAll();
    }
    async findOne(id) {
        const itemList = await this.itemsListRepository.findOne(id);
        if (!itemList) {
            throw new common_1.NotFoundException(`itemList with id '${id}' not found`);
        }
        return itemList;
    }
    async update(id, updateItemsListDto) {
        const uniqueItemList = await this.itemsListRepository.findOne(id);
        if (!uniqueItemList) {
            throw new common_1.NotFoundException(`item list with id '${id}' not found`);
        }
        try {
            await this.itemsListRepository.update(id, updateItemsListDto);
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async remove(id) {
        const uniqueItemList = await this.itemsListRepository.findOne(id);
        if (!uniqueItemList) {
            throw new common_1.NotFoundException(`item list with id '${id}' not found`);
        }
        try {
            await this.itemsListRepository.delete(id);
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException();
        }
    }
};
ItemsListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [items_list_repository_1.ItemsListRepository,
        products_repository_1.ProductsRepository])
], ItemsListService);
exports.ItemsListService = ItemsListService;
//# sourceMappingURL=items-list.service.js.map