import { Date, Schema, model } from "mongoose";

export interface IMemberShip {
  telephone_no: string;
  is_premium: boolean;
  payment_date: Date;
  effective_date: Date;
  expire_date: Date;
}

export const memberShipSchema = new Schema<IMemberShip>({
  telephone_no: String,
  is_premium: Boolean,
  payment_date: Date,
  effective_date: Date,
  expire_date: Date,
});

const MemberShip = model<IMemberShip>("memberships", memberShipSchema);
export default MemberShip;
