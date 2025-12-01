"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../controllers/users.controller");
const routerUsers = express_1.default.Router();
routerUsers.route('/login').post((req, res) => new users_controller_1.UsersController().login(req, res));
routerUsers.route('/qrCodeFor2FA').get((req, res) => new users_controller_1.UsersController().qrCodeFor2FA(req, res));
routerUsers.route('/qrCodeVerification').post((req, res) => new users_controller_1.UsersController().qrCodeVerification(req, res));
routerUsers.route('/registration').post((req, res) => new users_controller_1.UsersController().registration(req, res));
exports.default = routerUsers;
//# sourceMappingURL=routerUsers.js.map