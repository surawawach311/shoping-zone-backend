import { Schema, model } from "mongoose";
import { IFileUpload } from "./fileUpload";
import { IProduct } from "./product";

export interface IRegisterProduct {
  telephone_no: string;
  status: string;
  paid_date: string;
  paid_time: string;
  from_bank_account: string;
  from_bank_account_name: string;
  slip_url: string;
  effective_date: Date;
  expire_date: Date;
  approve_date: Date;
  upload: IFileUpload;
  product: IProduct;
}

export const registerProductSchema = new Schema<IRegisterProduct>({
  telephone_no: String,
  status: { type: String, default: "waiting" },
  paid_date: String,
  paid_time: String,
  from_bank_account: String,
  from_bank_account_name: String,
  slip_url: String,
  effective_date: { type: Date, default: null },
  expire_date: { type: Date, default: null },
  approve_date: { type: Date, default: null },
  upload: Object,
  product: Object,
});
const RegisterProduct = model<IRegisterProduct>("registerProduct", registerProductSchema);
export default RegisterProduct;
