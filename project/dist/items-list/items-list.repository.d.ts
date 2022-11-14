import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
export declare class ItemsListRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").ItemList[]>;
    findOne(id: string): Prisma.Prisma__ItemListClient<import(".prisma/client").ItemList, never>;
    create(itemList: Prisma.ItemListCreateInput): Prisma.Prisma__ItemListClient<import(".prisma/client").ItemList, never>;
    update(id: string, itemList: Prisma.ItemListUpdateInput): Prisma.Prisma__ItemListClient<import(".prisma/client").ItemList, never>;
    delete(id: string): Prisma.Prisma__ItemListClient<import(".prisma/client").ItemList, never>;
}
