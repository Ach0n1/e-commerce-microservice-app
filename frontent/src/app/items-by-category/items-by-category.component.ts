import { Component, OnInit } from '@angular/core';
import { Item } from '../models/items';
import { ItemsService } from '../services/items.service';
import { Router } from '@angular/router';
import { ItemForCart } from '../models/itemForCart';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-items-by-category',
  templateUrl: './items-by-category.component.html',
  styleUrls: ['./items-by-category.component.css']
})
export class ItemsByCategoryComponent implements OnInit {

  constructor(private itemsService: ItemsService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
    this.searchCategory = localStorage.getItem('searchCategory');
    if (this.searchCategory != null && this.searchCategory != '' && this.searchCategory != 'undefined'){
      // localStorage.removeItem('searchCategory');
      this.title = "Proizvodi iz kategorije: '" + this.searchCategory + "'";
      this.itemsService.getItemsByCategory(this.searchCategory).subscribe((items : Item[]) => {
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
          this.message = "Traženi artikal ne postoji!"
        }
      })
    }
  }



  
  searchedItems : Item[] = [];
  searchCategory : string;
  message : string;
  searchedItemsExists : boolean;
  title: string;

  
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

}
