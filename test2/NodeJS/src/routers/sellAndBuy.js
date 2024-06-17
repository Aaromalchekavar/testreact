const express = require("express");
const SellBuy = require("../mongoose/models/sellBuy")

// setting up the router

const Router = express.Router();

Router.get('/sellProduct',(req,res)=>{
let query = {}
let sortBy = null
if(req.query.product){
    query.productName = req.query.product
}
if(req.query.sortBy){
    switch(req.query.sortBy){
        case "lowerCostPrice":
            sortBy = {costPrice:1}
            break
        case "higherCostPrice":
            sortBy = {costPrice:-1}
            break
        case "lowerSoldPrice":
            sortBy = {soldPrice:1}
            break
        case "higherSoldPrice":
            sortBy = {soldPrice:-1}
            break
        default:
            null
    }
    }
SellBuy.find(query).sort(sortBy)
.then(response=>res.status(200).json(response))
.catch(err=>res.status(400).json({message:err.message}))
}
)

Router.post('/sellProduct',(req,res)=>{
    if(req.body.productName.length < 4){
        res.status(400).json({error:"product name should have minimum of four characters"})
    }else if(req.body.costPrice < 1){
        res.status(400).json({error:"cost price value cannot be zero or negative value"})
    }else{
        const data = new SellBuy(req.body)
        data.save()
        .then(()=>{res.status(201).json({message:"Product Added"})})
        .catch(err=>res.status(400).json({message:err.message}))
    }
})

Router.patch('/sellProduct/:id',(req,res)=>{
    if(req.body.soldPrice < 1){
        res.status(400).json({error:"sold price value cannot be zero or negative value"})
    }else{
        SellBuy.findByIdAndUpdate(req.params.id,req.body,{new:true})
        .then(()=>{res.status(200).json({message:"Updated Successfully"})})
        .catch(err=>res.status(400).json({message:err.message}))
    }
})

Router.delete('/sellProduct/:id',(req,res)=>{
    SellBuy.findByIdAndDelete(req.params.id)
    .then(()=>{res.status(200).json({message:"Deleted successfully"})})
    .catch(err=>res.status(400).json({message:err.message}))
})

module.exports = Router