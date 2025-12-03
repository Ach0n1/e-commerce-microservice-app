import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemForCart } from '../models/itemForCart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.allItemsAddedInTheCart = JSON.parse(localStorage.getItem("allItemsAddedInTheCart"));
    this.allItemsAddedInTheCart.forEach(element => {
      this.totalPrice = this.totalPrice + element.quantity * (element.item.price - (element.item.price * element.item.discount)/100); 
    });
    
  }
  allItemsAddedInTheCart : ItemForCart[];
  totalPrice : number = 0;
  
  itemQuantityIncrement(itemQuantityId){
    (<HTMLInputElement>document.getElementById(itemQuantityId)).stepUp(1);
  }

  itemQuantityDecrement(itemQuantityId){
    (<HTMLInputElement>document.getElementById(itemQuantityId)).stepDown(1);
  }

  removeItemFromCart(itemId, itemTotalPrice){
    this.totalPrice = this.totalPrice - itemTotalPrice;
    this.allItemsAddedInTheCart = this.allItemsAddedInTheCart.filter((element) => {
      return element.item.id !== itemId;
    });
    localStorage.setItem('allItemsAddedInTheCart', JSON.stringify(this.allItemsAddedInTheCart));
  }



}


