import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { User } from '../models/users';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router, private toast: NgToastService) { }

  registrationForm: FormGroup;
  registrationSuccess: boolean;
  qrCodeImage: string;

  ngOnInit(): void {
    this.usersService.qrCodeFor2FA().subscribe((qr: string) => {

      this.qrCodeImage = qr;

    })
    this.registrationForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  registrationMessage: string;

  registration(registrationForm) {

    if (registrationForm.value.firstName == null || registrationForm.value.firstName == undefined || registrationForm.value.firstName == "" || registrationForm.value.lastName == null || registrationForm.value.lastName == undefined || registrationForm.value.lastName == "" || registrationForm.value.email == null || registrationForm.value.email == undefined || registrationForm.value.email == "" || registrationForm.value.password == null || registrationForm.value.password == undefined || registrationForm.value.password == "") {
      this.registrationMessage = "Sva polja moraju biti popunjena!";
      return
    }
    this.usersService.registration(registrationForm.value.firstName, registrationForm.value.lastName, registrationForm.value.email, registrationForm.value.password).subscribe((res) => {  
      
      this.registrationSuccess = res['success'];
      if (this.registrationSuccess == false) {
        this.registrationMessage = res['message'];
      } else {
          this.toast.success({detail:"SUCCESS",summary:'Registracija je uspešna!',duration: 5000});
          this.router.navigate(['login']);
      }
    })


  }

}
