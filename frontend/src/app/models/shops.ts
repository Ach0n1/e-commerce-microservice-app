import { ShopPosition } from "./shopPosition";
import { ShopWorkingHours } from "./shopWorkingHours";

export class Shop {
    id : number;
    name : string;
    address : string;
    position : ShopPosition
    info : string;
    workingHours : ShopWorkingHours
}