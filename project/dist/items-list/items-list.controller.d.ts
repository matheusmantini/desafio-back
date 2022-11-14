import { ItemsListService } from "./items-list.service";
import { CreateItemListDto, UpdateItemListDto } from "./dto";
export declare class ItemsListController {
    private readonly itemsListService;
    constructor(itemsListService: ItemsListService);
    create(createItemsListDto: CreateItemListDto): Promise<void>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").ItemList[]>;
    findOne(id: string): Promise<import(".prisma/client").ItemList>;
    update(id: string, updateItemsListDto: UpdateItemListDto): Promise<void>;
    remove(id: string): Promise<void>;
}
