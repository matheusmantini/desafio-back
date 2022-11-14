import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { ProductsRepository } from "src/products/products.repository";
import { CreateItemListDto, UpdateItemListDto } from "./dto";
import { ItemsListRepository } from "./items-list.repository";

@Injectable()
export class ItemsListService {
  constructor(
    private readonly itemsListRepository: ItemsListRepository,
    private readonly productsRepository: ProductsRepository
  ) {}

  async create(createItemsListDto: CreateItemListDto) {
    const product = await this.productsRepository.findOne(
      createItemsListDto.product_id
    );

    if (!product) {
      throw new NotFoundException(
        `product with id '${createItemsListDto.product_id}' not found`
      );
    }

    const body = {
      product_id: createItemsListDto.product_id,
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

  async update(id: string, updateItemsListDto: UpdateItemListDto) {
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
  }
}
