const express=require("express")
const Products=require("../models/product")
const mongodb = require("mongodb")
const router=express.Router()


// GET /categories
router.get("/", async (req, res) => {
    try {
        const products = await Products.find({})
        res.json(products)
    } catch (error) {
        console.log("Error: ", error)
    }
})



// Todo: create all required API Ends


module.exports=router

