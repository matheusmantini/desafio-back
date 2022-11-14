import { Module } from '@nestjs/common';
import { ItemsListService } from './items-list.service';
import { ItemsListController } from './items-list.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ItemsListRepository } from './items-list.repository';
import { ProductsRepository } from 'src/products/products.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ItemsListController],
  providers: [ItemsListService, ItemsListRepository, ProductsRepository]
  
})
export class ItemsListModule {}
