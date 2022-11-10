import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
export declare class ProductsRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Products[]>;
    findOne(id: string): Prisma.Prisma__ProductsClient<import(".prisma/client").Products, never>;
    create(product: Prisma.ProductsCreateInput): Prisma.Prisma__ProductsClient<import(".prisma/client").Products, never>;
    update(id: string, product: Prisma.ProductsUpdateInput): Prisma.Prisma__ProductsClient<import(".prisma/client").Products, never>;
    delete(id: string): Prisma.Prisma__ProductsClient<import(".prisma/client").Products, never>;
}
