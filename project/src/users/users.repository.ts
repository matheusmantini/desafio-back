import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(){
    return this.prismaService.users.findMany();
  }

  findOne(id: string) {
    return this.prismaService.users.findUnique({
      where: { id },
    });
  }

  create(user: Prisma.UsersCreateInput) {
    return this.prismaService.users.create({ data: user });
  }

  update(id: string, user: Prisma.UsersUpdateInput) {
    return this.prismaService.users.update({
      where: { id },
      data: user,
    });
  }

}