import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
export declare class PurchasesController {
    private readonly purchasesService;
    constructor(purchasesService: PurchasesService);
    create(createPurchaseDto: CreatePurchaseDto): Promise<void>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Purchases[]>;
    findOne(id: string): Promise<import(".prisma/client").Purchases>;
    remove(id: string): Promise<void>;
}
