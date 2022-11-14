import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ItemsListRepository } from 'src/items-list/items-list.repository';
import { UsersRepository } from 'src/users/users.repository';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchasesRepository } from './purchases.repository';

@Injectable()
export class PurchasesService {

  constructor(
    private readonly purchasesRepository: PurchasesRepository,
    private readonly itemListRepository: ItemsListRepository,
    private readonly usersRepository: UsersRepository
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto) {
    let totalPurchase = 0;

    const user = await this.usersRepository.findOne(createPurchaseDto.user_id);
      
    if (!user) {
      throw new NotFoundException(
        `user not found with id '${createPurchaseDto.user_id}'`,
      );
    }

    for (let i = 0; i < createPurchaseDto.items_list_id.length; i++) {
      const purchaseItem = await this.itemListRepository.findOne(
        createPurchaseDto.items_list_id[i],
      );
      
      if (!purchaseItem) {
        throw new NotFoundException(
          `item not found with id '${createPurchaseDto.items_list_id[i]}'`,
        );
      }

      totalPurchase += purchaseItem.product_price * purchaseItem.quantity;
    }

    const body = {
      user_id: createPurchaseDto.user_id,
      total_price: totalPurchase,
      items_list_id: createPurchaseDto.items_list_id,
      purchase_date: createPurchaseDto.purchase_date,
    };

    try {
      await this.purchasesRepository.create(body);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return this.purchasesRepository.findAll();
  }

  async findOne(id: string) {
    const purchase = await this.purchasesRepository.findOne(id);

    if (!purchase) {
      throw new NotFoundException(`purchase with id '${id}' not found`);
    }

    return purchase;
  }

  async remove(id: string) {
    const uniquePurchase = await this.purchasesRepository.findOne(id);

    if (!uniquePurchase) {
      throw new NotFoundException(`purchase with id '${id}' not found`);
    }

    try {
      await this.purchasesRepository.delete(id);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
