import { Request, Response, NextFunction } from "express";
import Product from "../model/product";
import { uploadFile } from "../config/uploadToS3";
import FileUpload from "../model/fileUpload";
import MemberShip from "../model/membership";
import RegisterProduct from "../model/registerProduct";

const getProductsRegisterByTelNo = async (req: Request, res: Response) => {
  try {
    const { telephone_no } = req.query;
    if (!telephone_no) {
      return res.status(400).json({ status: 400, message: "ไม่พบหมายเลขโทรศัพท์" });
    }
    const product = await Product.find().lean();
    const productRegistered = await RegisterProduct.find({ telephone_no: telephone_no }).lean();

    const mergedArray = product.map((prod) => {
      const matchingRegis = productRegistered.find((reg) => reg.product._id == prod._id);
      return { ...prod, status: matchingRegis ? matchingRegis.status : null };
    });

    return res.status(200).json({ message: "success", data: mergedArray });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error });
  }
};

const registerProduct = async (req: any, res: Response) => {
  try {
    const { telephone_no, date, time, from_bank_account_no, from_bank_account_name, product } = req.body;

    if (!(telephone_no && from_bank_account_no && from_bank_account_name && product)) {
      return res.status(400).json({ status: 400, message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }
    if (!req.file) {
      return res.status(400).json({ status: 400, message: "no file" });
    }
    await uploadFile(req.file, "registerProduct").then((rs: any) => {
      const uploaded = {
        telephone_no: telephone_no,
        image_url: rs.data.Location,
        from_bank_account: from_bank_account_no,
        from_bank_account_name: from_bank_account_name,
        paid_date: new Date(date),
        paid_time: time,
      };
      const registerProduct = {
        product: JSON.parse(product),
        telephone_no: telephone_no,
        paid_date: new Date(date),
        paid_time: time,
        from_bank_account: from_bank_account_no,
        from_bank_account_name: from_bank_account_name,
        upload: uploaded,
      };
      RegisterProduct.create(registerProduct).catch((error) => console.log(error));
      FileUpload.create(uploaded).then((result) => {
        return res.status(201).json({ status: 201, message: "upload success", data: result });
      });
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error });
  }
};
module.exports = { getProductsRegisterByTelNo, registerProduct };
