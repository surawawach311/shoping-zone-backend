import { Schema, model } from "mongoose";

export interface IProductPrices {
  level1: string;
  level2: string;
  level3: string;
}
export interface IProduct {
  _id: import("mongoose").Types.ObjectId;
  product_name: string;
  prices: IProductPrices;
  open_time: string;
  img_url: string;
}
export const ProductPricesSchema = new Schema<IProductPrices>({
  level1: String,
  level2: String,
  level3: String,
});

export const ProductSchema = new Schema<IProduct>({
  product_name: String,
  prices: ProductPricesSchema,
  open_time: String,
  img_url: String,
});
const Product = model<IProduct>("products", ProductSchema);
export default Product;
