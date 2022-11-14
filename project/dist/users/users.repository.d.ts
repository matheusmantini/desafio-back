import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
export declare class UsersRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Users[]>;
    findOne(id: string): Prisma.Prisma__UsersClient<import(".prisma/client").Users, never>;
    create(user: Prisma.UsersCreateInput): Prisma.Prisma__UsersClient<import(".prisma/client").Users, never>;
    update(id: string, user: Prisma.UsersUpdateInput): Prisma.Prisma__UsersClient<import(".prisma/client").Users, never>;
}
