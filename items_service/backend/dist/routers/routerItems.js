"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const items_controller_1 = require("../contorllers/items.controller");
const routerItems = express_1.default.Router();
routerItems.route('/getAllItems').get((req, res) => new items_controller_1.ItemsController().getAllItems(req, res));
routerItems.route('/getCategories').get((req, res) => new items_controller_1.ItemsController().getCategories(req, res));
routerItems.route('/getItemsByCategory').post((req, res) => new items_controller_1.ItemsController().getItemsByCategory(req, res));
routerItems.route('/getItemsBySearchParam').post((req, res) => new items_controller_1.ItemsController().getItemsBySearchParam(req, res));
routerItems.route('/getDiscountedProducts').get((req, res) => new items_controller_1.ItemsController().getDiscountedProducts(req, res));
exports.default = routerItems;
//# sourceMappingURL=routerItems.js.map