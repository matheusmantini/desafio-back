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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsListController = void 0;
const common_1 = require("@nestjs/common");
const items_list_service_1 = require("./items-list.service");
const dto_1 = require("./dto");
let ItemsListController = class ItemsListController {
    constructor(itemsListService) {
        this.itemsListService = itemsListService;
    }
    create(createItemsListDto) {
        return this.itemsListService.create(createItemsListDto);
    }
    findAll() {
        return this.itemsListService.findAll();
    }
    findOne(id) {
        return this.itemsListService.findOne(id);
    }
    update(id, updateItemsListDto) {
        return this.itemsListService.update(id, updateItemsListDto);
    }
    remove(id) {
        return this.itemsListService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateItemListDto]),
    __metadata("design:returntype", void 0)
], ItemsListController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ItemsListController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ItemsListController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateItemListDto]),
    __metadata("design:returntype", void 0)
], ItemsListController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ItemsListController.prototype, "remove", null);
ItemsListController = __decorate([
    (0, common_1.Controller)("items-list"),
    __metadata("design:paramtypes", [items_list_service_1.ItemsListService])
], ItemsListController);
exports.ItemsListController = ItemsListController;
//# sourceMappingURL=items-list.controller.js.map