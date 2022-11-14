import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PurchasesRepository } from './purchases.repository';

@Injectable()
export class PurchasesService {
/* 
  constructor(
    private readonly purchasesRepository: PurchasesRepository,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto) {
    const product = await this.purchasesRepository.findOne(
      createPurchaseDto
    );

    if (!product) {
      throw new NotFoundException(
        `product with id '${createPurchaseDto.product_id}' not found`
      );
    }

    const body = {
      product_id: createPurchaseDto.product_id,
      product_name: product.name,
      product_price: product.price,
      quantity: createItemsListDto.quantity,
    };

    try {
      await this.itemsListRepository.create(body);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return this.itemsListRepository.findAll();
  }

  async findOne(id: string) {
    const itemList = await this.itemsListRepository.findOne(id);

    if (!itemList) {
      throw new NotFoundException(`itemList with id '${id}' not found`);
    }

    return itemList;
  }

  async update(id: string, updatePurchaseDto: UpdatePurchaseDto) {
    const uniqueItemList = await this.itemsListRepository.findOne(id);

    if (!uniqueItemList) {
      throw new NotFoundException(`item list with id '${id}' not found`);
    }

    try {
      await this.itemsListRepository.update(id, updateItemsListDto);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {
    const uniqueItemList = await this.itemsListRepository.findOne(id);

    if (!uniqueItemList) {
      throw new NotFoundException(`item list with id '${id}' not found`);
    }

    try {
      await this.itemsListRepository.delete(id);
    } catch {
      throw new InternalServerErrorException();
    }
  } */
}
