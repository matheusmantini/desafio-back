import { PurchaseEntity } from "../../entities/purchase.entity";

export const purchaseEntityList: PurchaseEntity[] = [
  {
    id: '1',
    user_id: '1',
    total_price: 111.11,
    items_list_id: ['1', '2', '3'],
    purchase_date: new Date('2023-01-01'),
  },
  {
    id: '2',
    user_id: '2',
    total_price: 222.22,
    items_list_id: ['4', '5', '6'],
    purchase_date: new Date('2023-02-02'),
  },
  {
    id: '3',
    user_id: '3',
    total_price: 333.33,
    items_list_id: ['7', '8', '9'],
    purchase_date: new Date('2023-03-03'),
  },
];