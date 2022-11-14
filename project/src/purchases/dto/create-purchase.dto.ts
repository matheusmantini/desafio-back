import { IsArray, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreatePurchaseDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsArray()
  @IsNotEmpty()
  items_list_id: string[];

  @IsDateString()
  @IsNotEmpty()
  purchase_date: Date;
}
