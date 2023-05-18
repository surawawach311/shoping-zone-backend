import { Date, Schema, model } from "mongoose";

export interface IFileUpload {
  telephone_no: string;
  image_url: string;
  upload_datime: Date;
  upload_type: string;
}

export const FileUploadSchema = new Schema<IFileUpload>({
  telephone_no: String,
  image_url: String,
  upload_datime: Date,
  upload_type: String,
});

const FileUpload = model<IFileUpload>("fileUpload", FileUploadSchema);
export default FileUpload;
