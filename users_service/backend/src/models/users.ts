import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema ({
    id : {
        type : Number
    },
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type: String
    },
    type : {
        type : Number
    },
    secret : {
        type : String
    }

});

export default mongoose.model("UsersModel", User, "users")