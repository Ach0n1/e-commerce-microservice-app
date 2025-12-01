import express from 'express';
import { UsersController } from '../controllers/users.controller';

const routerUsers = express.Router();

routerUsers.route('/login').post(
    (req, res) => new UsersController().login(req,res)
)
routerUsers.route('/qrCodeFor2FA').get(
    (req, res) => new UsersController().qrCodeFor2FA(req,res)
)

routerUsers.route('/qrCodeVerification').post(
    (req, res) => new UsersController().qrCodeVerification(req,res)
)

routerUsers.route('/registration').post(
    (req, res) => new UsersController().registration(req,res)
)

export default routerUsers;