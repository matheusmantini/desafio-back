import { Prisma } from "@prisma/client";
export declare class CreateItemListDto {
    product_id: string;
    product_price?: number;
    quantity: number;
    product?: Prisma.ProductsCreateNestedOneWithoutItemListInput;
}
