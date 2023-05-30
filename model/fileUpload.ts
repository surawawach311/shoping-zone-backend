import { Date, Schema, model } from "mongoose";

export interface IFileUpload {
  telephone_no: string;
  image_url: string;
  paid_date: string;
  paid_time: string;
  from_bank_account: string;
  from_bank_account_name: string;
  upload_datime: Date;
  upload_type: string;
}

export const FileUploadSchema = new Schema<IFileUpload>({
  telephone_no: String,
  image_url: String,
  paid_date: String,
  paid_time: String,
  from_bank_account: String,
  from_bank_account_name: String,
  upload_datime: { type: Date, default: Date.now },
  upload_type: { type: String, default: "premium" },
});

const FileUpload = model<IFileUpload>("fileUpload", FileUploadSchema);
export default FileUpload;
