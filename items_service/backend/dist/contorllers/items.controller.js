"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsController = void 0;
const items_1 = __importDefault(require("../models/items"));
class ItemsController {
    constructor() {
        this.getAllItems = (req, res) => {
            items_1.default.find({}, (err, items) => {
                if (err)
                    console.log(err);
                else
                    res.json(items);
            });
        };
        this.getCategories = (req, res) => {
            let categories = [];
            items_1.default.distinct("category", (err, fechedCategories) => {
                if (err)
                    console.log(err);
                else {
                    // loop through array, replacing _ with blank character and making first letter uppercase letter
                    for (let category of fechedCategories) {
                        category = category.replace('_', ' ');
                        let firstLetter = category.charAt(0).toUpperCase();
                        let remainingLetters = category.slice(1);
                        categories.push(firstLetter + remainingLetters);
                    }
                    res.json(categories);
                }
            });
        };
        this.getItemsByCategory = (req, res) => {
            let categoryParam = req.body.categoryParam;
            categoryParam = categoryParam.replace(' ', '_');
            categoryParam = categoryParam.toLowerCase();
            items_1.default.find({ category: new RegExp(categoryParam, 'i') }, (err, items) => {
                if (err)
                    console.log(err);
                else
                    res.json(items);
            });
        };
        this.getItemsBySearchParam = (req, res) => {
            let searchParam = req.body.searchParam;
            items_1.default.find({ $text: { $search: searchParam } }, (err, items) => {
                if (err)
                    console.log(err);
                else {
                    res.json(items);
                }
            });
        };
        this.getDiscountedProducts = (req, res) => {
            items_1.default.find({ onSale: true }, (err, items) => {
                if (err)
                    console.log(err);
                else {
                    res.json(items);
                }
            });
        };
    }
}
exports.ItemsController = ItemsController;
//# sourceMappingURL=items.controller.js.map