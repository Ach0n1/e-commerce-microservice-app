import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:10000";

  getAllShopsDetails(){
    return this.http.get(`${this.uri}/shops/getAllShopsDetails`);
  }

  
  addNewShop(name,address,latitude,longitude,monday,thuesday,wednesday,thursday,friday,saturday,sunday){
    const data = {
      name : name,
      address : address,
      lat : latitude,
      lng : longitude,
      monday : monday,
      thuesday : thuesday,
      wednesday : wednesday,
      thursday : thursday,
      friday : friday,
      saturday : saturday,
      sunday : sunday
    }
    return this.http.post(`${this.uri}/shops/addNewShop`, data);
  }

  removeShop(shopId){
    const data = {
      id : shopId
    }
    return this.http.post(`${this.uri}/shops/removeShop`, data);
  }
}
