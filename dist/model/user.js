"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
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
const User = (0, mongoose_1.model)("User", exports.userSchema);
exports.default = User;
