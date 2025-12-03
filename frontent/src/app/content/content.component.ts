import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { Router } from '@angular/router';
import { User } from '../models/users';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private itemsService: ItemsService, private router : Router) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (this.user != null) this.userLoggedIn = true;
    this.itemsService.getCategories().subscribe((categories : string[]) => {
      this.categories = categories;
    });

  }

  numberOfItemsInTheCart = (JSON.parse(localStorage.getItem('allItemsAddedInTheCart'))).length;

  categories : string[];
  searchParam : string;
  user : User;
  userLoggedIn : boolean = false;

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
    this.router.navigate(['home']);
  }


}
