import { Component, OnInit } from '@angular/core';
import { User } from '../models/users';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  email: string;
  password: string;
  errorMessage: string;
  userExists: boolean;

  // qrCodeImage: string;
  qrDigit1: string;
  qrDigit2: string;
  qrDigit3: string;
  qrDigit4: string;
  qrDigit5: string;
  qrDigit6: string;
  qrCode: string;
  qrErrorMessage: string;
  qrCodeVerified: boolean;


  login() {
    this.usersService.login(this.email, this.password).subscribe((user: User) => {
      if (user != null) {
        this.userExists = true;
        localStorage.setItem('loggedInUser', JSON.stringify(user));

        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //sledece 3 linije se brisu za produkciju!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        this.router.navigate(['home']).then(() => {
          window.location.reload();
        });
        // this.usersService.qrCodeFor2FA().subscribe((qr: string) => {

        //   this.qrCodeImage = qr;

        // })

        // this.errorMessage = "Uspeh!"
      }

      else {
        this.userExists = false;
        this.errorMessage = "E-mail i/ili lozinka su pogrešni. Mollimo pokušajte ponovo."
      }
    })

  }


  twoFALogin() {
    // this.qrCode = Number(this.qrDigit1)*100000 + Number(this.qrDigit2)*10000 + Number(this.qrDigit3)*1000 + Number(this.qrDigit4)*100 + Number(this.qrDigit5)*10 + Number(this.qrDigit6)*1;
    if (this.qrDigit1 == undefined || this.qrDigit1 == null || this.qrDigit2 == undefined || this.qrDigit2 == null || this.qrDigit3 == undefined || this.qrDigit3 == null || this.qrDigit4 == undefined || this.qrDigit4 == null || this.qrDigit5 == undefined || this.qrDigit5 == null || this.qrDigit6 == undefined || this.qrDigit6 == null) {
      this.qrCodeVerified = false;
      this.qrErrorMessage = "Potrebno je popuniti sva polja! Pokušajte ponovo."
      return
    }
    this.qrCode = this.qrDigit1.concat(this.qrDigit2, this.qrDigit3, this.qrDigit4, this.qrDigit5, this.qrDigit6);
    this.usersService.qrCodeVerification(this.qrCode, this.email).subscribe((verified: boolean) => {
      if (verified != null) {
        this.qrCodeVerified = verified;
        if (verified == true) {
          this.router.navigate(['home']).then(() => {
          window.location.reload();
  });
        } else this.qrErrorMessage = "Uneti token nije ispravan. Pokušajte ponovo!"
      } else this.qrErrorMessage = "Došlo je do greške. Pokušajte ponovo!"
    })
  }
}
