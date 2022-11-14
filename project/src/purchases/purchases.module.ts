import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PurchasesRepository } from './purchases.repository';
import { ItemsListRepository } from 'src/items-list/items-list.repository';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PurchasesController],
  providers: [PurchasesService, PurchasesRepository, ItemsListRepository, UsersRepository]
})
export class PurchasesModule {}
