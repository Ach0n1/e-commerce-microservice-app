"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comments_controller_1 = require("../controllers/comments.controller");
const routerComments = express_1.default.Router();
routerComments.route('/getComments').post((req, res) => new comments_controller_1.CommentsController().getComments(req, res));
exports.default = routerComments;
//# sourceMappingURL=routerComments.js.map