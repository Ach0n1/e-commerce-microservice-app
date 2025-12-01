"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsController = void 0;
const comments_1 = __importDefault(require("../models/comments"));
class CommentsController {
    constructor() {
        this.getComments = (req, res) => {
            let itemId = req.body.itemId;
            comments_1.default.find({ 'itemId': itemId }, (err, comments) => {
                if (err)
                    console.log(err);
                else
                    res.json(comments);
            });
        };
    }
}
exports.CommentsController = CommentsController;
//# sourceMappingURL=comments.controller.js.map