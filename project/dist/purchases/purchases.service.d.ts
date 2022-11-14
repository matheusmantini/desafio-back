import { ItemsListRepository } from 'src/items-list/items-list.repository';
import { UsersRepository } from 'src/users/users.repository';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchasesRepository } from './purchases.repository';
export declare class PurchasesService {
    private readonly purchasesRepository;
    private readonly itemListRepository;
    private readonly usersRepository;
    constructor(purchasesRepository: PurchasesRepository, itemListRepository: ItemsListRepository, usersRepository: UsersRepository);
    create(createPurchaseDto: CreatePurchaseDto): Promise<void>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Purchases[]>;
    findOne(id: string): Promise<import(".prisma/client").Purchases>;
    remove(id: string): Promise<void>;
}
