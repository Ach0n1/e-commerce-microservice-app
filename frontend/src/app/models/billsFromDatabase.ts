import { PurchasedItemFromDatabase } from "./purchasedItemsFromDatabase";

export class BillsFromDatabase {  
    billId: Number;
    userId: Number;
    boughtItems: Array<PurchasedItemFromDatabase>;
    totalPrice: Number;
    dateTime: String;
}