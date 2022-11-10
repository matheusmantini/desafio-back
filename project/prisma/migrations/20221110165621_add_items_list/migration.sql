/*
  Warnings:

  - You are about to drop the column `product_id` on the `Purchases` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Purchases` table. All the data in the column will be lost.
  - Added the required column `purchase_date` to the `Purchases` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Purchases" DROP CONSTRAINT "Purchases_product_id_fkey";

-- AlterTable
ALTER TABLE "Purchases" DROP COLUMN "product_id",
DROP COLUMN "quantity",
ADD COLUMN     "items_list_id" TEXT[],
ADD COLUMN     "purchase_date" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "ItemList" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "product_price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ItemList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemList" ADD CONSTRAINT "ItemList_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
