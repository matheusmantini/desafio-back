import { ProductsRepository } from "src/products/products.repository";
import { CreateItemListDto, UpdateItemListDto } from "./dto";
import { ItemsListRepository } from "./items-list.repository";
export declare class ItemsListService {
    private readonly itemsListRepository;
    private readonly productsRepository;
    constructor(itemsListRepository: ItemsListRepository, productsRepository: ProductsRepository);
    create(createItemsListDto: CreateItemListDto): Promise<void>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").ItemList[]>;
    findOne(id: string): Promise<import(".prisma/client").ItemList>;
    update(id: string, updateItemsListDto: UpdateItemListDto): Promise<void>;
    remove(id: string): Promise<void>;
}
