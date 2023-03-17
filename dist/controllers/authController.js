"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../model/user"));
//Register
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //register logic
    try {
        const { first_name, last_name, telephone_no, password, bank_account_name_provider, bank_account_name, bank_account_no, line_id, } = req.body;
        // //Validate user input
        if (!(telephone_no &&
            first_name &&
            last_name &&
            password &&
            bank_account_name_provider &&
            bank_account_name &&
            bank_account_no &&
            line_id)) {
            return res.status(400).json({ status: 400, message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
        }
        // check duplicate user
        const oldUser = yield user_1.default.findOne({ telephone_no });
        if (oldUser) {
            return res.status(409).json({ status: 409, message: "หมายเลขโทรศัพท์นี้ถูกลงทะเบียนไปแล้วกรุณาใช้หลายเลขอื่น" });
        }
        //Encrypt user password
        let encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
        //Create user
        const user = yield user_1.default.create({
            first_name,
            last_name,
            telephone_no,
            password: encryptedPassword,
            bank_account_name_provider,
            bank_account_name,
            bank_account_no,
            line_id,
        });
        const token = jsonwebtoken_1.default.sign({ user_id: user.id, telephone_no }, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });
        user.token = token;
        res.status(201).json({ status: 201, message: "created", data: user });
    }
    catch (error) {
        res.status(500).json({ status: 201, message: error });
    }
});
// login
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { telephone_no, password } = req.body;
        // check empty
        if (!(telephone_no && password)) {
            res.status(400).json({ status: 400, message: "กรุณากรอกหมายเลขโทรศัพท์หรือรหัสผ่าน" });
        }
        //Validate if user exist in DB
        const user = yield user_1.default.findOne({ telephone_no });
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            //Create token
            const token = jsonwebtoken_1.default.sign({ user_id: user._id, telephone_no }, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            //save user token
            user.token = token;
            return res.status(200).json({ status: 200, message: "Login successfully", data: user });
        }
        return res.status(400).json({ status: 400, message: "หมายเลขโทรศัพท์หรือรหัสผ่านไม่ถูกต้อง" });
    }
    catch (error) {
        return res.status(500).json({ status: 500, message: error });
    }
});
const welcomeController = (req, res) => {
    return res.status(200).json("Welcome");
};
module.exports = { registerController, loginController, welcomeController };
