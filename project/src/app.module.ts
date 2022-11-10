import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { PurchasesModule } from './purchases/purchases.module';
import { UsersRepository } from './users/users.repository';

@Module({
  imports: [PrismaModule, UsersModule, ProductsModule, PurchasesModule],
})
export class AppModule {}
