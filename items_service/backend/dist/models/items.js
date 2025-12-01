"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Item = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    price: {
        type: Number
    },
    photo: {
        type: String
    },
    category: {
        type: String
    },
    subcategory: {
        type: String
    },
    availableQuantity: {
        type: Number
    },
    onSale: {
        type: Boolean
    },
    discount: {
        type: Number
    },
    description: {
        type: Object
    }
});
exports.default = mongoose_1.default.model("ItemsModel", Item, "items");
//# sourceMappingURL=items.js.map