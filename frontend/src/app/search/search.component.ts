import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';
import { Item } from '../models/items';
import { Router } from '@angular/router';
import { ItemForCart } from '../models/itemForCart';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../models/users';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private itemsService : ItemsService, private router : Router, private toast: NgToastService) {

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedInUser'));
    //if there is no user logged in, create empy instance of class User to avoid errors
    if (this.user==null) this.user = new User();
     this.searchParam = localStorage.getItem('searchParam');
     if (this.searchParam != null && this.searchParam != '' && this.searchParam != 'undefined'){
      // localStorage.removeItem('searchParam');
      this.title = "Pojam za pretragu: '" + this.searchParam + "'";
      this.itemsService.getItemsBySearchParam(this.searchParam).subscribe((items : Item[]) => {
        if (items.length != 0) {
          this.searchedItemsExists = true;
          items.forEach((item) => {
            if (item.onSale == true) {
              item.discountPrice = Math.round(((100 - item.discount) * item.price) / 100)
            }
            this.searchedItems.push(item);
          })
          // this.searchedItems = items;
        } 
        else {
          this.searchedItemsExists = false;
          this.title = "Pretraga neuspešna!";
          this.message = "Traženi artikal ne postoji!";
        }
      })

    }
    else {
      this.title = "Pretraga neuspešna!";
      this.message = "Traženi artikal ne postoji!";
    }
    
  }

  searchedItems : Item[] = [];
  searchCategory : string;
  searchParam : string;
  message : string;
  searchedItemsExists : boolean;
  title: string;
  user: User;


  itemDetails(item){
    localStorage.setItem('itemDetails', JSON.stringify(item));
    this.router.navigate(['item-details']);
  }
  
  itemQuantityIncrement(itemQuantityId){
    (<HTMLInputElement>document.getElementById(itemQuantityId)).stepUp(1);
  }

  itemQuantityDecrement(itemQuantityId){
    (<HTMLInputElement>document.getElementById(itemQuantityId)).stepDown(1);
  }
  

  addToCart(item, itemQuantity, itemQuantityId){
    // if(this.user == null) this.router.navigate(['login']);
    // else {
    if (itemQuantity > 0){
    let itemForCart = {} as ItemForCart;
    itemForCart.quantity = itemQuantity;
    itemForCart.item = item;


    // Parse any JSON previously stored in allItemsAddedInTheCart
    let allItemsAddedInTheCart = JSON.parse(localStorage.getItem("allItemsAddedInTheCart"));
    if(allItemsAddedInTheCart == null) allItemsAddedInTheCart = [];

      
    //check if item is already added in the cart
    const itemExistsInTheCart = allItemsAddedInTheCart.find(arrayElement => {
      if (arrayElement.item.id === itemForCart.item.id){
        return true;
      }
      return false;
    });

    if (itemExistsInTheCart){
      (<HTMLInputElement>document.getElementById(itemQuantityId)).stepDown(itemQuantity);
      this.toast.info({detail:"INFO",summary:'Artikal se neć nalazi u korpi!',duration: 2000});

    }
    else {
      allItemsAddedInTheCart.push(itemForCart);
      localStorage.setItem("allItemsAddedInTheCart", JSON.stringify(allItemsAddedInTheCart));
      (<HTMLInputElement>document.getElementById(itemQuantityId)).stepDown(itemQuantity);
      this.toast.success({detail:"SUCCESS",summary:'Artikal dodat u korpu!',duration: 2000});
    }

  }
}

addToPromotion(itemId, discount){
  if (discount <= 0 || discount > 100){
    this.toast.warning({detail:"INFO",summary:'Popust nije validan!',duration: 2000});
    return;
  }
  this.itemsService.addToPromotion(itemId, discount).subscribe(resp => {
    location.reload();
  });
}
cancelPromotion(itemId){
  this.itemsService.cancelPromotion(itemId).subscribe(resp => {
    location.reload();
  });
}
}
