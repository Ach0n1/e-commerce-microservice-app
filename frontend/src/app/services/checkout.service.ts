import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:9000";


  
  submitOrder(allItemsAddedInTheCart, totalPrice, userId){

    let boughtItems = [];

    allItemsAddedInTheCart.forEach(element => {
      let boughtItem = {
        itemId : element.item.id,
        quantity : Number(element.quantity)
      }
      boughtItems.push(boughtItem);
    });

    const data = {
      boughtItems : boughtItems,
      totalPrice : totalPrice,
      userId : userId
    }
    return this.http.post(`${this.uri}/checkout/submitOrder`, data);
  }

  updateItemsSoldByCategoryStatistics(allItemsAddedInTheCart){
    let dataForItemsSoldByCategoryStatistics = [];
    

    allItemsAddedInTheCart.forEach(element => {

      let categoryAndQuantityData = {
        category : element.item.category,
        quantity : Number(element.quantity)
      }

      dataForItemsSoldByCategoryStatistics.push(categoryAndQuantityData);
    });

    const dataForItemsSoldByCategoryStatisticsUpdate = {
      categoryAndQuantityBoughtItemsDetails : dataForItemsSoldByCategoryStatistics
    }


    return this.http.post(`${this.uri}/checkout/updateItemsSoldByCategoryStatistics`, dataForItemsSoldByCategoryStatisticsUpdate);
  }

  updateItemsSoldCounterStatistics(allItemsAddedInTheCart){
    let dataForItemsSoldCounterStatistics = [];

    allItemsAddedInTheCart.forEach(element => {
      let itemName =  element.item.name + " " + element.item.description.weight;
      let itemsSoldCounterData = {
        itemId : element.item.id,
        itemName : itemName,
        quantity : Number(element.quantity)
      }

      dataForItemsSoldCounterStatistics.push(itemsSoldCounterData);
    });


    const dataForItemsSoldCounterStatisticsUpdate = {
      boughtItems : dataForItemsSoldCounterStatistics
    }

    return this.http.post(`${this.uri}/checkout/updateItemsSoldCounterStatistics`, dataForItemsSoldCounterStatisticsUpdate);
  }

  checkIfUserEverBoughtParticularItem(itemId, userId){

    const data = {
      userId : userId,
      itemId : itemId
    }

    return this.http.post(`${this.uri}/checkout/checkIfUserEverBoughtParticularItem`, data);
  }


}
