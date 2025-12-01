import { ItemDescription } from "./itemDescription";

export class Item {
    id : number;
    name : string;
    price : number;
    photo : string;
    category : string;
    subcategory : string;
    availableQuantity : number;
    onSale : Boolean;
    discount : number;
    description : ItemDescription;

    discountPrice : number;

}