import { Request, Response, NextFunction } from "express";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user";

//Register
const registerController = async (req: Request, res: Response) => {
  //register logic
  try {
    const {
      first_name,
      last_name,
      telephone_no,
      password,
      bank_account_name_provider,
      bank_account_name,
      bank_account_no,
      line_id,
    } = req.body;

    // //Validate user input
    if (
      !(
        telephone_no &&
        first_name &&
        last_name &&
        password &&
        bank_account_name_provider &&
        bank_account_name &&
        bank_account_no &&
        line_id
      )
    ) {
      return res.status(400).json({ status: 400, message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }

    // check duplicate user
    const oldUser = await User.findOne({ telephone_no });

    if (oldUser) {
      return res.status(409).json({ status: 409, message: "หมายเลขโทรศัพท์นี้ถูกลงทะเบียนไปแล้วกรุณาใช้หลายเลขอื่น" });
    }

    //Encrypt user password
    let encryptedPassword = await bcrypt.hash(password, 10);

    //Create user
    const user = await User.create({
      first_name,
      last_name,
      telephone_no,
      password: encryptedPassword,
      bank_account_name_provider,
      bank_account_name,
      bank_account_no,
      line_id,
    });

    const token = jwt.sign({ user_id: user.id, telephone_no }, process.env.JWT_SECRET as string, {
      expiresIn: "2h",
    });

    user.token = token;

    res.status(201).json({ status: 201, message: "created", data: user });
  } catch (error) {
    res.status(500).json({ status: 201, message: error });
  }
};

// login
const loginController = async (req: Request, res: Response) => {
  try {
    const { telephone_no, password } = req.body;
    // check empty
    if (!(telephone_no && password)) {
      res.status(400).json({ status: 400, message: "กรุณากรอกหมายเลขโทรศัพท์หรือรหัสผ่าน" });
    }

    //Validate if user exist in DB
    const user = await User.findOne({ telephone_no });

    if (user && (await bcrypt.compare(password, user.password))) {
      //Create token
      const token = jwt.sign({ user_id: user._id, telephone_no }, process.env.JWT_SECRET as string, {
        expiresIn: "2h",
      });
      //save user token
      user.token = token;

      return res.status(200).json({ status: 200, message: "Login successfully", data: user });
    }

    return res.status(400).json({ status: 400, message: "หมายเลขโทรศัพท์หรือรหัสผ่านไม่ถูกต้อง" });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error });
  }
};

const welcomeController = (req: Request, res: Response) => {
  return res.status(200).json("Welcome");
};

module.exports = { registerController, loginController, welcomeController };
