import { Request, Response, NextFunction } from "express";
import MemberShip from "../model/membership";
import { uploadFile } from "../config/uploadToS3";
import { log } from "console";
import FileUpload from "../model/fileUpload";
import { Location } from "aws-sdk";

// import User from "../model/user";

const getMemberShip = async (req: Request, res: Response) => {
  try {
    const { telephone_no } = req.body;
    const premium = await MemberShip.findOne({ telephone_no });
    return res.status(200).json({ message: "verified successfully", is_premium: premium ? true : false });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error });
  }
};
const createMemberShip = async (req: Request, res: Response) => {
  try {
    if (!req.body.telephone_no) {
      return res.status(400).json({ status: 400, message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: error });
  }
};

const uploadSlip = async (req: any, res: Response) => {
  try {
    const { telephone_no, upload_type } = req.body;

    if (!(telephone_no && upload_type && req.file)) {
      return res.status(400).json({ status: 400, message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }
    // const path = `https://shoppingzone-uploadfile.s3.ap-southeast-1.amazonaws.com/${Date.now()}${
    //   req.file.originalname
    // }`;
    await uploadFile(req.file).then((rs: any) => {
      // console.log(path);
      const uploaded = {
        telephone_no: telephone_no,
        image_url: rs.data.Location,
        upload_datime: Date.now(),
        upload_type: upload_type,
      };
      FileUpload.create(uploaded).then((result) => {
        return res.status(201).json({ status: 201, message: "upload success", data: result });
      });
    });

    // const savedFile = await fileUpload.save();
    // res.status(201).json({
    //   status: 201,
    //   message: "Upload success",
    // data: savedFile,
    // });
    // await uploadFile(req.file).then((rs: any) => rs.data.Location);
    // await FileUpload.create({
    //   telephone_no,
    //   path,
    //   upload_type,
    // }).then((result) => {
    //   return res.status(201).json({ status: 201, message: "upload success", data: result });
    // });

    //   await uploadFile(req.file)
    //     .then(async (res: any) => {
    //       let path = await res.data.Location;
    //       let curDate = new Date();
    //       const upload = await FileUpload.create({
    //         telephone_no,
    //         path,
    //         curDate,
    //         upload_type,
    //       });
    //       console.log(upload);
    //     })
    //     .then((result) => {
    //       return res.status(201).json({ status: 201, message: "upload success" });
    //     });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error });
  }
};

module.exports = { getMemberShip, createMemberShip, uploadSlip };
