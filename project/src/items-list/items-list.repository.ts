import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ItemsListRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.itemList.findMany();
  }

  findOne(id: string) {
    return this.prismaService.itemList.findUnique({ where: { id } });
  }

  create(itemList: Prisma.ItemListCreateInput) {
    return this.prismaService.itemList.create({ data: itemList });
  }

  update(id: string, itemList: Prisma.ItemListUpdateInput) {
    return this.prismaService.itemList.update({
      where: { id },
      data: itemList,
    });
  }

  delete(id: string) {
    return this.prismaService.itemList.delete({ where: { id } });
  }
}
