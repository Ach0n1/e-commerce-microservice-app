import { DailyIncome } from "./dailyIncome";
import { DailyOrders } from "./dailyOrders";
import { ItemsSoldByCategory } from "./itemsSoldByCategory";
import { ItemsSoldCounter } from "./itemsSoldCounter";

export class Statistics {
    statisticsId : Number;
    itemsSoldByCategory : Array<ItemsSoldByCategory>;
    itemsSoldCounter: Array<ItemsSoldCounter>;
    dailyIncome: Array<DailyIncome>;
    dailyOrders: Array<DailyOrders>
}