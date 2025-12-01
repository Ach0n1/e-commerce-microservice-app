import { HostListener, Component, OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { Router } from '@angular/router';
import { User } from '../models/users';
import { CurrencyRate } from '../models/currencyRate';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private itemsService: ItemsService, private router : Router) { }

  ngOnInit(): void {

    // get todays date in order to get currency rates
    this.today = new Date();
    this.todayString = this.today.getFullYear().toString() + '-' + String(this.today.getMonth() + 1).padStart(2, '0') + '-' + String(this.today.getDate()).padStart(2, '0');

    this.user = JSON.parse(localStorage.getItem('loggedInUser'));
    //if there is no user logged in, create empy instance of class User to avoid errors
    if (this.user==null) {
      this.user = new User();
      this.userLoggedIn = false;
    } else {
      this.userLoggedIn = true;
      this.startTimer();
    }
    this.itemsService.getCategories().subscribe((categories : string[]) => {
      this.categories = categories;
    });

    
    this.itemsService.getCurrencyToday(this.todayString).subscribe((currencyRate : CurrencyRate) => {
      this.currencyRateEur = Number((1/currencyRate.rsd.eur).toFixed(4));
      this.currencyRateUsd = Number((1/currencyRate.rsd.usd).toFixed(4));
      this.currencyRateGbp = Number((1/currencyRate.rsd.gbp).toFixed(4));
      this.currencyRateChf = Number((1/currencyRate.rsd.chf).toFixed(4));
      this.currencyRateRub = Number((1/currencyRate.rsd.rub).toFixed(4));
      this.currencyRateCad = Number((1/currencyRate.rsd.cad).toFixed(4));
      this.currencyRateAud = Number((1/currencyRate.rsd.aud).toFixed(4));
    });
  }

  // numberOfItemsInTheCart = (JSON.parse(localStorage.getItem('allItemsAddedInTheCart'))).length;

  categories : string[];
  searchParam : string;
  user : User;
  userLoggedIn : boolean = false;
  currencyRateEur : number;
  currencyRateUsd : number;
  currencyRateGbp : number;
  currencyRateChf : number;
  currencyRateRub : number;
  currencyRateCad : number;
  currencyRateAud : number;
  today: Date;
  todayString: string;


  categoryNavigation(category){
    localStorage.setItem('searchCategory', category);
    let currentUrl = this.router.url;
    if(currentUrl == '/items-by-category') location.reload();
    this.router.navigate(['items-by-category']);
  }

  searchItems(){
    if(this.searchParam == undefined) this.router.navigate(['home']);
    else {
    localStorage.setItem('searchParam', this.searchParam);
    let currentUrl = this.router.url;
    if(currentUrl == '/search') location.reload();
    else this.router.navigate(['search']);
    this.searchParam == null;
  }
  }

  logout(){
    localStorage.removeItem('loggedInUser');
    this.userLoggedIn = false;
    // location.reload();
    // this.router.navigate(['home']);
    this.router.navigate(['home']).then(() => {
      window.location.reload();
  });
  }



//podesiti timeout za logout nakon n sekundi neaktivnosti
//podesiti timeout za logout nakon n sekundi neaktivnosti
//podesiti timeout za logout nakon n sekundi neaktivnosti
//podesiti timeout za logout nakon n sekundi neaktivnosti

//podesiti timeout za logout nakon n sekundi neaktivnosti
//podesiti timeout za logout nakon n sekundi neaktivnosti
//podesiti timeout za logout nakon n sekundi neaktivnosti
//podesiti timeout za logout nakon n sekundi neaktivnosti

//podesiti timeout za logout nakon n sekundi neaktivnosti
//podesiti timeout za logout nakon n sekundi neaktivnosti
//podesiti timeout za logout nakon n sekundi neaktivnosti
//podesiti timeout za logout nakon n sekundi neaktivnosti
//podesiti timeout za logout nakon n sekundi neaktivnosti

//podesiti timeout za logout nakon n sekundi neaktivnosti
//podesiti timeout za logout nakon n sekundi neaktivnosti
//podesiti timeout za logout nakon n sekundi neaktivnosti
//podesiti timeout za logout nakon n sekundi neaktivnosti
//podesiti timeout za logout nakon n sekundi neaktivnosti
//podesiti timeout za logout nakon n sekundi neaktivnosti

//podesiti timeout za logout nakon n sekundi neaktivnosti
//podesiti timeout za logout nakon n sekundi neaktivnosti
//podesiti timeout za logout nakon n sekundi neaktivnosti
//podesiti timeout za logout nakon n sekundi neaktivnosti
//podesiti timeout za logout nakon n sekundi neaktivnosti

  timerStartTime = 100;
  timeLeft: number = this.timerStartTime;
  interval;

  startTimer() {
      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.timeLeft = this.timerStartTime;
          clearInterval(this.interval);
          this.logout();
        }
      },1000)
  }

  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(e) {
    //restart timer when mouse is moved
    this.timeLeft = this.timerStartTime;
  }
  @HostListener('document:click', ['$event'])
  DocumentClick(event: Event) {
    //restart timer when mouse is clicked
    this.timeLeft = this.timerStartTime;
  }
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    //restart timer when any key on keyboard is clicked
    this.timeLeft = this.timerStartTime;
  }
  


}
