import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Item = new Schema ({
    id : {
        type : Number
    },
    name : {
        type : String
    },
    price : {
        type : Number
    },
    photo : {
        type : String
    },
    category : {
        type : String
    },
    subcategory : {
        type : String
    },
    availableQuantity : {
        type : Number
    },
    onSale : {
        type : Boolean
    },
    discount : {
        type : Number
    },
    description : {
        type : Object
    }
});

export default mongoose.model("ItemsModel", Item, "items")