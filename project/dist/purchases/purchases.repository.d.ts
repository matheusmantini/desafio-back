import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
export declare class PurchasesRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Purchases[]>;
    findOne(id: string): Prisma.Prisma__PurchasesClient<import(".prisma/client").Purchases, never>;
    create(purchases: Prisma.PurchasesCreateInput): Prisma.Prisma__PurchasesClient<import(".prisma/client").Purchases, never>;
    delete(id: string): Prisma.Prisma__PurchasesClient<import(".prisma/client").Purchases, never>;
}
