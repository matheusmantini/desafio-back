import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { ItemsListRepository } from "../items-list/items-list.repository";
import { UsersRepository } from "../users/users.repository";
import { CreatePurchaseDto } from "./dto/create-purchase.dto";
import { PurchasesRepository } from "./purchases.repository";

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
        `user not found with id '${createPurchaseDto.user_id}'`
      );
    }

    for (let i = 0; i < createPurchaseDto.items_list_id.length; i++) {
      const purchaseItem = await this.itemListRepository.findOne(
        createPurchaseDto.items_list_id[i]
      );

      if (!purchaseItem) {
        throw new NotFoundException(
          `item not found with id '${createPurchaseDto.items_list_id[i]}'`
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

  async findAll() {
    const purchases = await this.purchasesRepository.findAll();

    let purchasesWithInfo = [];

    for (let i = 0; i < purchases.length; i++) {
      const userInfo = await this.usersRepository.findOne(purchases[i].user_id);
      const itemsListDetails = [];

      for (let j = 0; j < purchases[i].items_list_id.length; j++) {
        const itemsList = await this.itemListRepository.findOne(
          purchases[i].items_list_id[j]
        );

        const itemsListInfo = {
          name: itemsList.product_name,
          price: itemsList.product_price,
          quantity: itemsList.quantity,
          total_item: itemsList.product_price * itemsList.quantity,
        };
        itemsListDetails.push(itemsListInfo);
      }

      const itemsListWithInfo = {
        id: purchases[i].id,
        client_name: userInfo.name,
        purchase_date: purchases[i].purchase_date,
        items_list: itemsListDetails,
        total_purchase: purchases[i].total_price,
      };

      purchasesWithInfo.push(itemsListWithInfo);
    }
    return purchasesWithInfo;
  }

  async findOne(id: string) {
    const purchase = await this.purchasesRepository.findOne(id);

    if (!purchase) {
      throw new NotFoundException(`purchase with id '${id}' not found`);
    }

    const userInfo = await this.usersRepository.findOne(purchase.user_id);
    const itemsListDetails = [];

    for (let i = 0; i < purchase.items_list_id.length; i++) {
      const itemsList = await this.itemListRepository.findOne(
        purchase.items_list_id[i]
      );

      const itemsListInfo = {
        name: itemsList.product_name,
        price: itemsList.product_price,
        quantity: itemsList.quantity,
        total_item: itemsList.product_price * itemsList.quantity,
      };
      itemsListDetails.push(itemsListInfo);
    }

    return {
      id: purchase.id,
      client_name: userInfo.name,
      purchase_date: purchase.purchase_date,
      items_list: itemsListDetails,
      total_purchase: purchase.total_price,
    };
  }

  async remove(id: string) {
    const uniquePurchase = await this.purchasesRepository.findOne(id);

    if (!uniquePurchase) {
      throw new NotFoundException(`purchase with id '${id}' not found`);
    }

    try {
      await this.purchasesRepository.delete(id);

      for (let i = 0; i < uniquePurchase.items_list_id.length; i++) {
        await this.itemListRepository.delete(uniquePurchase.items_list_id[i]);      
      }
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
