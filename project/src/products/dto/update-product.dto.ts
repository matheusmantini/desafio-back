import { PartialType } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { CreateProductDto } from "./create-product.dto";

export class UpdateProductDto {
  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  image_url?: string;
}
