import { PurchaseEntity } from "../../entities/purchase.entity";

export const purchaseEntityList: PurchaseEntity[] = [
  {
    id: "1",
    user_id: "1",
    total_price: 500.00,
    items_list_id: ["1"],
    purchase_date: new Date("2023-01-01"),
  },
  {
    id: "2",
    user_id: "2",
    total_price: 1300.00,
    items_list_id: ["2"],
    purchase_date: new Date("2023-02-02"),
  },
  {
    id: "3",
    user_id: "3",
    total_price: 1000.00,
    items_list_id: ["3"],
    purchase_date: new Date("2023-03-03"),
  },
];

export const purchaseFinalList = [
  {
    id: "1",
    client_name: "João",
    purchase_date: new Date("2023-01-01"),
    items_list: [
      {
        name: 'Produto 1',
        price: 10.00,
        quantity: 10,
        total_item: 100.00
      },
    ],
    total_purchase: 500.00,
  },
  {
    id: "2",
    client_name: "Maria",
    purchase_date: new Date("2023-02-02"),
    items_list: [
      {
        name: 'Produto 2',
        price: 20.00,
        quantity: 20,
        total_item: 400.00
      },
    ],
    total_purchase: 1300.00,
  },
  {
    id: "3",
    client_name: "José",
    purchase_date: new Date("2023-03-03"),
    items_list: [   
      {
        name: 'Produto 3',
        price: 30.00,
        quantity: 30,
        total_item: 900.00
      },
    ],
    total_purchase: 1000.00,
  },
];
