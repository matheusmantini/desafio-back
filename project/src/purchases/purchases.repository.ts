import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PurchasesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.purchases.findMany();
  }

  findOne(id: string) {
    return this.prismaService.purchases.findUnique({ where: { id } });
  }

  create(purchases: Prisma.PurchasesCreateInput) {
    return this.prismaService.purchases.create({ data: purchases });
  }

  delete(id: string) {
    return this.prismaService.purchases.delete({ where: { id } });
  }
}
