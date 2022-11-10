import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDto) {
    const registeredProducts = await this.productsRepository.findAll();

    for (let i = 0; i < registeredProducts.length; i++) {
      if (registeredProducts[i].name === createProductDto.name) {
        throw new ConflictException(
          `Product with name '${registeredProducts[i].name}' already exists`
        );
      }
    }

    try {
      await this.productsRepository.create(createProductDto);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return this.productsRepository.findAll();
  }

  async findOne(id: string) {
    const product = await this.productsRepository.findOne(id);

    if(!product){
      throw new NotFoundException(`product with id '${id}' not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    const product = await this.productsRepository.findOne(id);

    if(!product){
      throw new NotFoundException(`product with id '${id}' not found`);
    }

    try {
      await this.productsRepository.update(id, updateProductDto);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {

    const product = await this.productsRepository.findOne(id);

    if(!product){
      throw new NotFoundException(`product with id '${id}' not found`);
    }
    
    try {
      await this.productsRepository.delete(id);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
