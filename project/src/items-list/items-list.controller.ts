import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ItemsListService } from "./items-list.service";
import { CreateItemListDto, UpdateItemListDto } from "./dto";

@Controller("items-list")
export class ItemsListController {
  constructor(private readonly itemsListService: ItemsListService) {}

  @Post()
  create(@Body() createItemsListDto: CreateItemListDto) {
    return this.itemsListService.create(createItemsListDto);
  }

  @Get()
  findAll() {
    return this.itemsListService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.itemsListService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateItemsListDto: UpdateItemListDto
  ) {
    return this.itemsListService.update(id, updateItemsListDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.itemsListService.remove(id);
  }
}
