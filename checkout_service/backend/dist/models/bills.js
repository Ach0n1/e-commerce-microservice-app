"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Bill = new Schema({
    billId: {
        type: Number
    },
    userId: {
        type: Number
    },
    items: {
        type: Array
    },
    totalPrice: {
        type: Number
    }
});
exports.default = mongoose_1.default.model("BillsModel", Bill, "bills");
//# sourceMappingURL=bills.js.map