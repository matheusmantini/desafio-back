import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<void>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Products[]>;
    findOne(id: string): Promise<import(".prisma/client").Products>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<void>;
    remove(id: string): Promise<void>;
}
