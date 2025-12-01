import { PurchasedItem } from "./purchasedItem";

export class Bills {  
    billId: Number;
    userId: Number;
    items: Array<PurchasedItem>;
    totalPrice: Number;
    dateTime: String;
}