import express from 'express';
import UsersModel from '../models/users';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';


var qrCodeSecret:string;

export class UsersController {

    
    
    login = (req: express.Request, res: express.Response) => {
        let email = req.body.email;
        let password = req.body.password;


        UsersModel.findOne({'email' : email, 'password' : password}, (err, user) => {
            if (err) console.log(err)
            else res.json(user)
        })
    }

    qrCodeFor2FA = (req: express.Request, res: express.Response) => {
        let secret = speakeasy.generateSecret({
            name: "MasterRad"
        });
        qrCodeSecret = secret.ascii;
        qrcode.toDataURL(secret.otpauth_url, function(err, data){
            res.json(data)
        })
    }

    qrCodeVerification = (req: express.Request, res: express.Response) => {
        let qrToken = req.body.token;
        let email = req.body.email;

        UsersModel.findOne({'email' : email}, (err, user) => {
            if (err) console.log(err)
            else if (user != null && user != undefined){
                let usersQRSecret = user.secret;
                let verified = speakeasy.totp.verify({
                    secret: usersQRSecret,
                    encoding: 'ascii',
                    token: qrToken
                });
                res.json(verified)
            }

        });




        
    }

    registration = (req: express.Request, res: express.Response) => {
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;
        let password = req.body.password;
        UsersModel.findOne({'email' : email}, (err, user) => {
            if (err) console.log(err)
            else if (user == null || user == undefined){

                let newUser = new UsersModel({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    type: 0,
                    secret: qrCodeSecret
                });
                newUser.save((err) => {
                    if (err) console.log(err)
                    else res.json({ message: "Registracija uspešna!", success: true})
                });

            } else res.json( {message: "E-mail adresa već postoji. Molimo pokušajte ponovo.", success: false})
        });



    }
}