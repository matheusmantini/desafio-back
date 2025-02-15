"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasesModule = void 0;
const common_1 = require("@nestjs/common");
const purchases_service_1 = require("./purchases.service");
const purchases_controller_1 = require("./purchases.controller");
const prisma_module_1 = require("../prisma/prisma.module");
const purchases_repository_1 = require("./purchases.repository");
const items_list_repository_1 = require("../items-list/items-list.repository");
const users_repository_1 = require("../users/users.repository");
let PurchasesModule = class PurchasesModule {
};
PurchasesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [purchases_controller_1.PurchasesController],
        providers: [purchases_service_1.PurchasesService, purchases_repository_1.PurchasesRepository, items_list_repository_1.ItemsListRepository, users_repository_1.UsersRepository]
    })
], PurchasesModule);
exports.PurchasesModule = PurchasesModule;
//# sourceMappingURL=purchases.module.js.map