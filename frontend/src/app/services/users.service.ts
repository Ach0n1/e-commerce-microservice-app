import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:5000";

  login(email, password) {
    const data = {
      email: email,
      password: password
    };

    return this.http.post(`${this.uri}/users/login`, data);
  }

  registration(firstName, lastName, email, password) {
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };

    return this.http.post(`${this.uri}/users/registration`, data);
  }

  qrCodeFor2FA(){
    return this.http.get(`${this.uri}/users/qrCodeFor2FA`);
  }

  qrCodeVerification(token, email){
    const data = {
      token: token,
      email: email
    }
    return this.http.post(`${this.uri}/users/qrCodeVerification`, data);
  }


}
