const mongoose = require("mongoose");

//write your code for sellBuySchema collection here - model

const sellBuySchema = new mongoose.Schema({
    productName:{type:String,required:true,minLength:4},
    costPrice:{type:Number,min:1},
    soldPrice:{type:Number,min:1},
})

const SellBuy = mongoose.model("sellBuyCollection",sellBuySchema);
module.exports = SellBuy;