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

  getCategories(){
    return this.http.get(`${this.uri}/items/getCategories`);
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

  
}
