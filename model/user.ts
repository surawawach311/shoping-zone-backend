import { Schema, model } from "mongoose";

export interface IUser {
  first_name: string;
  last_name: string;
  telephone_no: string;
  password: string;
  token: string;
  bank_account_name_provider: string;
  bank_account_name: string;
  bank_account_no: string;
  line_id: string;
}

export const userSchema = new Schema<IUser>({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  telephone_no: String,
  password: String,
  token: String,
  bank_account_name_provider: String,
  bank_account_name: String,
  bank_account_no: String,
  line_id: String,
});

const User = model<IUser>("User", userSchema);
export default User;
