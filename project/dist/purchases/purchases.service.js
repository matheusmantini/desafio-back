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
exports.PurchasesService = void 0;
const common_1 = require("@nestjs/common");
const items_list_repository_1 = require("../items-list/items-list.repository");
const users_repository_1 = require("../users/users.repository");
const purchases_repository_1 = require("./purchases.repository");
let PurchasesService = class PurchasesService {
    constructor(purchasesRepository, itemListRepository, usersRepository) {
        this.purchasesRepository = purchasesRepository;
        this.itemListRepository = itemListRepository;
        this.usersRepository = usersRepository;
    }
    async create(createPurchaseDto) {
        let totalPurchase = 0;
        const user = await this.usersRepository.findOne(createPurchaseDto.user_id);
        if (!user) {
            throw new common_1.NotFoundException(`user not found with id '${createPurchaseDto.user_id}'`);
        }
        for (let i = 0; i < createPurchaseDto.items_list_id.length; i++) {
            const purchaseItem = await this.itemListRepository.findOne(createPurchaseDto.items_list_id[i]);
            if (!purchaseItem) {
                throw new common_1.NotFoundException(`item not found with id '${createPurchaseDto.items_list_id[i]}'`);
            }
            totalPurchase += purchaseItem.product_price * purchaseItem.quantity;
        }
        const body = {
            user_id: createPurchaseDto.user_id,
            total_price: totalPurchase,
            items_list_id: createPurchaseDto.items_list_id,
            purchase_date: createPurchaseDto.purchase_date,
        };
        try {
            await this.purchasesRepository.create(body);
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException();
        }
    }
    findAll() {
        return this.purchasesRepository.findAll();
    }
    async findOne(id) {
        const purchase = await this.purchasesRepository.findOne(id);
        if (!purchase) {
            throw new common_1.NotFoundException(`purchase with id '${id}' not found`);
        }
        return purchase;
    }
    async remove(id) {
        const uniquePurchase = await this.purchasesRepository.findOne(id);
        if (!uniquePurchase) {
            throw new common_1.NotFoundException(`purchase with id '${id}' not found`);
        }
        try {
            await this.purchasesRepository.delete(id);
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException();
        }
    }
};
PurchasesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [purchases_repository_1.PurchasesRepository,
        items_list_repository_1.ItemsListRepository,
        users_repository_1.UsersRepository])
], PurchasesService);
exports.PurchasesService = PurchasesService;
//# sourceMappingURL=purchases.service.js.map