import { ProductEntity } from "../../entities/product.entity";

export const productsEntityList: ProductEntity[] = [
  {
    id: "1",
    name: "Product 1",
    price: 1.11,
    image_url: "http://google.com/product1.png",
  },
  {
    id: "2",
    name: "Product 2",
    price: 2.22,
    image_url: "http://google.com/product2.png",
  },
  {
    id: "3",
    name: "Product 3",
    price: 3.33,
    image_url: "http://google.com/product3.png",
  },
];

export const updatedProductsEntity = {
  id: "1",
  name: "Product 1",
  price: 1111.11,
  image_url: "http://google.com/product1.png",
};
