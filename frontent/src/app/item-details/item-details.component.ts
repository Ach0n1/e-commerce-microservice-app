import { Component, OnInit } from '@angular/core';
import { Item } from '../models/items';
import { ItemComments } from '../models/itemComments';
import { CommentsService } from '../services/comments.service';
import { NgToastService } from 'ng-angular-popup';
import { ItemForCart } from '../models/itemForCart';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  constructor(private commentsService : CommentsService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.itemComments = [];
    this.itemDetails = JSON.parse(localStorage.getItem('itemDetails'));
    this.discountItemPrice = Math.round(((100 - this.itemDetails.discount) * this.itemDetails.price) / 100);

    this.commentsService.getComments(this.itemDetails.id).subscribe((comments : ItemComments[]) => {
      let commentArray = [];
      comments.forEach((comment) => {
        //get substring of the email address before '@' character to make username 
        comment.username = comment.userEmail.substring(0, comment.userEmail.indexOf("@"));
        commentArray.push(comment)
      })
      this.itemComments = commentArray;
    })

  }

  itemDetails : Item;
  discountItemPrice: number;
  itemComments : ItemComments[];





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
  

}
