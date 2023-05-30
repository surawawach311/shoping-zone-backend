import { Request, Response, NextFunction } from "express";
import MemberShip from "../model/membership";
import { uploadFile } from "../config/uploadToS3";
import FileUpload from "../model/fileUpload";

// import User from "../model/user";

const getMemberShip = async (req: Request, res: Response) => {
  try {
    const { telephone_no } = req.query;

    const premium = await MemberShip.find({ telephone_no: telephone_no });
    if (premium) {
      return res.status(200).json({ message: "verified successfully", data: premium });
    } else {
      return res.status(200).json({ message: "data not found", data: premium });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: error });
  }
};

const getAllMemberShip = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    if (status) {
      const membership = await MemberShip.find({ status: status });
      return res.status(200).json({ message: "get with " + status + "complete", data: membership });
    } else {
      const membership = await MemberShip.find();
      return res.status(200).json({ message: "get complete", data: membership });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: error });
  }
};

const approvePremium = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const member = await MemberShip.findByIdAndUpdate(id, {
      status: "success",
      effective_date: new Date(),
      expire_date: new Date().setDate(new Date().getDate() + 30),
      approve_date: new Date(),
    });
    if (member) {
      return res.status(200).json({ message: "approved", data: member });
    } else {
      return res.status(200).json({ message: "not found id", data: member });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: error });
  }
};

const uploadSlip = async (req: any, res: Response) => {
  try {
    const { telephone_no, date, time, from_bank_account_no, from_bank_account_name } = req.body;

    if (!(telephone_no && from_bank_account_no && from_bank_account_name)) {
      return res.status(400).json({ status: 400, message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }
    if (!req.file) {
      return res.status(400).json({ status: 400, message: "no file" });
    }

    await uploadFile(req.file).then((rs: any) => {
      const uploaded = {
        telephone_no: telephone_no,
        image_url: rs.data.Location,
        from_bank_account: from_bank_account_no,
        from_bank_account_name: from_bank_account_name,
        paid_date: new Date(date),
        paid_time: time,
      };
      const member = {
        telephone_no: telephone_no,
        paid_date: new Date(date),
        paid_time: time,
        from_bank_account: from_bank_account_no,
        from_bank_account_name: from_bank_account_name,
        upload: uploaded,
      };
      MemberShip.create(member).catch((error) => console.log(error));
      FileUpload.create(uploaded).then((result) => {
        return res.status(201).json({ status: 201, message: "upload success", data: result });
      });
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error });
  }
};

module.exports = { getMemberShip, uploadSlip, getAllMemberShip, approvePremium };
