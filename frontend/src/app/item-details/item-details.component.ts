import { Component, OnInit } from '@angular/core';
import { Item } from '../models/items';
import { ItemComments } from '../models/itemComments';
import { CommentsService } from '../services/comments.service';
import { NgToastService } from 'ng-angular-popup';
import { ItemForCart } from '../models/itemForCart';
import { User } from '../models/users';
import { CheckoutService } from '../services/checkout.service';
import { Bills } from '../models/bills';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  constructor(private commentsService : CommentsService, private toast: NgToastService, private checkoutService : CheckoutService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedInUser'));
    //if there is no user logged in, create empy instance of class User to avoid errors
    if (this.user==null) this.user = new User();
    else this.userLoogedIn = true;
    

    this.itemComments = [];
    this.itemDetails = JSON.parse(localStorage.getItem('itemDetails'));
    this.discountItemPrice = Math.round(((100 - this.itemDetails.discount) * this.itemDetails.price) / 100);

    this.commentsService.getComments(this.itemDetails.id).subscribe((comments : ItemComments[]) => {
      // let commentArray = [];
      // comments.forEach((comment) => {
      //   //get substring of the email address before '@' character to make username 
      //   comment.username = comment.userEmail.substring(0, comment.userEmail.indexOf("@"));
      //   commentArray.push(comment)
      // })
      this.itemComments = comments;
    });

    this.checkoutService.checkIfUserEverBoughtParticularItem(this.itemDetails.id, this.user.id).subscribe( (arrayOfBillsWithSelectedItemBoughtByLoggedInUser : Bills[]) =>{
      if (arrayOfBillsWithSelectedItemBoughtByLoggedInUser.length == 0){
        this.userBoughtThisItem = false;
      } else {
        this.userBoughtThisItem = true;
      }
    })

  }

  itemDetails : Item;
  discountItemPrice: number;
  itemComments : ItemComments[];
  user : User;
  userLoogedIn : boolean = false;
  userBoughtThisItem : boolean;
  newItemRating : number = 0;
  newItemComment : string;



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
  addNewComment(){
    if (this.newItemRating > 0 && this.newItemComment != undefined){
    this.commentsService.addNewComment(this.itemDetails.id, this.user.email,this.newItemRating, this.newItemComment).subscribe(res => {
      this.toast.success({detail:"SUCCESS",summary: res['message'],duration: 2000});
      this.newItemComment = null;
      this.newItemRating = null;
      this.commentsService.getComments(this.itemDetails.id).subscribe((comments : ItemComments[]) => {
        this.itemComments = comments;
      });
    })
  } else {
    this.toast.error({detail:"ERROR",summary: "Uneti komentar nije validan. Pokušajte ponovo!",duration: 2000});
  }
  }
  

}
