import { Component } from '@angular/core';
import { Item } from '../models/items';
import { User } from '../models/users';
import { Router, ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ItemsService } from '../services/items.service';
import { ItemForCart } from '../models/itemForCart';


@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent {


  constructor(private itemsService: ItemsService, private router: Router, private route: ActivatedRoute, private toast: NgToastService) { }


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (this.user==null) this.user = new User();
    this.itemsService.getDiscountedProducts().subscribe((items : Item[]) => {
      items.forEach((item) => {
        if (item.onSale == true) {
          item.discountPrice = Math.round(((100 - item.discount) * item.price) / 100)
        }
        this.discountedProducts.push(item);
      })

    })
  }

  discountedProducts : Item[] = [];
  user : User;


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

cancelPromotion(itemId){
  this.itemsService.cancelPromotion(itemId).subscribe(resp => {
    location.reload();
  });
}

}
