import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
export declare class PurchasesController {
    private readonly purchasesService;
    constructor(purchasesService: PurchasesService);
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
