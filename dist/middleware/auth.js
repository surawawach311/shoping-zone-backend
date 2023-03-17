"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config = process.env;
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).json("A token is require for authentication");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config.JWT_SECRET);
        req.user = decoded;
    }
    catch (error) {
        return res.status(401).json("Invalid Token");
    }
    return next();
};
module.exports = verifyToken;
