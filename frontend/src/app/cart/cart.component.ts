import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemForCart } from '../models/itemForCart';
import { User } from '../models/users';
import { NgToastService } from 'ng-angular-popup';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private checkoutService: CheckoutService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedInUser'));
    this.allItemsAddedInTheCart = JSON.parse(localStorage.getItem("allItemsAddedInTheCart"));
    if (this.allItemsAddedInTheCart != null){
      this.allItemsAddedInTheCart.forEach(element => {
        this.totalPrice = this.totalPrice + element.quantity * (element.item.price - (element.item.price * element.item.discount)/100);
        this.totalPrice = Number((Math.round(this.totalPrice * 100) / 100).toFixed(2));
      });
    }
  }
  allItemsAddedInTheCart : ItemForCart[];
  totalPrice : number = 0;
  user : User;
  
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

  submitOrder(){
    this.checkoutService.submitOrder(this.allItemsAddedInTheCart, this.totalPrice, this.user.id).subscribe((response) => {

      this.checkoutService.updateItemsSoldByCategoryStatistics(this.allItemsAddedInTheCart).subscribe((response) => {
        console.log(response['message']);

        this.checkoutService.updateItemsSoldCounterStatistics(this.allItemsAddedInTheCart).subscribe((response) => {
          console.log(response['message']);

          this.allItemsAddedInTheCart.length = 0;
          localStorage.removeItem("allItemsAddedInTheCart");
          this.toast.success({detail:"SUCCESS",summary:'Porudžbina je prihvaćena!',duration: 2000}); 
        });
      });
      console.log(response['message']);
    })
  }



}


