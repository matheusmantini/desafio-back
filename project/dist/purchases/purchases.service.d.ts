import { ItemsListRepository } from "../items-list/items-list.repository";
import { UsersRepository } from "../users/users.repository";
import { CreatePurchaseDto } from "./dto/create-purchase.dto";
import { PurchasesRepository } from "./purchases.repository";
export declare class PurchasesService {
    private readonly purchasesRepository;
    private readonly itemListRepository;
    private readonly usersRepository;
    constructor(purchasesRepository: PurchasesRepository, itemListRepository: ItemsListRepository, usersRepository: UsersRepository);
    create(createPurchaseDto: CreatePurchaseDto): Promise<void>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<{
        id: string;
        client_name: string;
        purchase_date: Date;
        items_list: any[];
        total_purchase: number;
    }>;
    remove(id: string): Promise<void>;
}
