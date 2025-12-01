"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const users_1 = __importDefault(require("../models/users"));
const speakeasy_1 = __importDefault(require("speakeasy"));
const qrcode_1 = __importDefault(require("qrcode"));
var qrCodeSecret;
class UsersController {
    constructor() {
        this.login = (req, res) => {
            let email = req.body.email;
            let password = req.body.password;
            users_1.default.findOne({ 'email': email, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.qrCodeFor2FA = (req, res) => {
            let secret = speakeasy_1.default.generateSecret({
                name: "MasterRad"
            });
            qrCodeSecret = secret.ascii;
            qrcode_1.default.toDataURL(secret.otpauth_url, function (err, data) {
                res.json(data);
            });
        };
        this.qrCodeVerification = (req, res) => {
            let qrToken = req.body.token;
            let email = req.body.email;
            users_1.default.findOne({ 'email': email }, (err, user) => {
                if (err)
                    console.log(err);
                else if (user != null && user != undefined) {
                    let usersQRSecret = user.secret;
                    let verified = speakeasy_1.default.totp.verify({
                        secret: usersQRSecret,
                        encoding: 'ascii',
                        token: qrToken
                    });
                    res.json(verified);
                }
            });
        };
        this.registration = (req, res) => {
            let firstName = req.body.firstName;
            let lastName = req.body.lastName;
            let email = req.body.email;
            let password = req.body.password;
            users_1.default.findOne({ 'email': email }, (err, user) => {
                if (err)
                    console.log(err);
                else if (user == null || user == undefined) {
                    let newUser = new users_1.default({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password,
                        type: 0,
                        secret: qrCodeSecret
                    });
                    newUser.save((err) => {
                        if (err)
                            console.log(err);
                        else
                            res.json({ message: "Registracija uspešna!", success: true });
                    });
                }
                else
                    res.json({ message: "E-mail adresa već postoji. Molimo pokušajte ponovo.", success: false });
            });
        };
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map