import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Comment = new Schema ({
    itemId : {
        type : Number
    },
    userEmail : {
        type : String
    },
    rating : {
        type : Number
    },
    text : {
        type : String
    },
    timestamp : {
        type: String
    }
});

export default mongoose.model("CommentsModel", Comment, "comments")