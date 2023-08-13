const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description:String,
    category:String,
    image:String,
    rating:Object
})

//Todo: Model name (singular , lower cases)
const Products = mongoose.model("product", productSchema)

module.exports=Products