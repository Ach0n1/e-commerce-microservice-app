import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/items';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  constructor(private http: HttpClient) { }

  
  uri = "http://localhost:9000";
  getAllBills(){
    return this.http.get(`${this.uri}/checkout/getAllBills`);
  }

  getUserDataForBillPDF(userId){
    const data = {
      userId : userId
    }
    return this.http.post(`http://localhost:5000/users/getUserDataForBillPDF`, data);
  }

  
  getSoldItemsByCategory(){
    return this.http.get(`${this.uri}/checkout/getSoldItemsByCategory`);    
  }

  getItemsSoldCounter(){
    return this.http.get(`${this.uri}/checkout/getItemsSoldCounter`);    
  }
  
  getDailyIncome(){
    return this.http.get(`${this.uri}/checkout/getDailyIncome`);    
  }

  getDailyOrders(){
    return this.http.get(`${this.uri}/checkout/getDailyOrders`);    
  }

}
