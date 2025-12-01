import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Bill = new Schema ({
    billId : {
        type : Number
    },
    userId : {
        type : Number
    },
    items : {
        type : Array
    },
    totalPrice: {
        type : Number
    }
});

export default mongoose.model("BillsModel", Bill, "bills")