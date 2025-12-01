import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemForCart } from '../models/itemForCart';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000";

  getAllItems(){
    return this.http.get(`${this.uri}/items/getAllItems`);
  }

  getItemById(itemId){
    const data = {
      id : itemId
    }
    return this.http.post(`${this.uri}/items/getItemById`, data);
  }

  getCategories(){
    return this.http.get(`${this.uri}/items/getCategories`);
  }

  getSubcategories(category){
    const data = {
      category : category
    }
    return this.http.post(`${this.uri}/items/getSubcategories`, data);
  }

  getItemsByCategory(categoryParam){
    const data = {
      categoryParam : categoryParam
    }
    return this.http.post(`${this.uri}/items/getItemsByCategory`, data);
  }

  getItemsBySearchParam(searchParam){
    const data = {
      searchParam : searchParam
    }
    return this.http.post(`${this.uri}/items/getItemsBySearchParam`, data);
  }

  getDiscountedProducts(){
    return this.http.get(`${this.uri}/items/getDiscountedProducts`);
  }

  // getCurrencyRateUsd(){
  //   return this.http.get(`https://api.exchangerate.host/latest?base=rsd&symbols=USD,EUR,CHF,GBP,AUD,CAD,RUB`);
  // }

  getCurrencyToday(today){
    return this.http.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${today}/currencies/rsd.json`);
  }


  
  cancelPromotion(itemId){
    const data = {
      id : itemId
    }
    return this.http.post(`${this.uri}/items/cancelPromotion`, data);
  }

  addToPromotion(itemId, discount){
    const data = {
      id : itemId,
      discount : discount
    }
    return this.http.post(`${this.uri}/items/addToPromotion`, data);
  }

  addNewItem(itemName, price, category, subcategory, quantity, weight, countryOfOrigin, ingredients, manufacturer, brand, briefDescription, photo){
    const postData = new FormData();
    postData.append("itemName", itemName);
    postData.append("price", price);
    postData.append("category", category);
    postData.append("subcategory", subcategory);
    postData.append("quantity", quantity);
    postData.append("weight", weight);
    postData.append("countryOfOrigin", countryOfOrigin);
    postData.append("ingredients", ingredients);
    postData.append("manufacturer", manufacturer);
    postData.append("brand", brand);
    postData.append("briefDescription", briefDescription);
    postData.append("photo", photo);
   
    return this.http.post(`${this.uri}/items/addNewItem`, postData);

  }

  addItemImage(id, photo){
    const postData = new FormData();
    postData.append("id", id);
    postData.append("photo", photo);
   
    return this.http.post(`${this.uri}/items/addItemImage`, postData);

  }

  addNewItems(items){
    const data = {
      items : items
    }
    return this.http.post(`${this.uri}/items/addNewItems`, data);

  }

}
