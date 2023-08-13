const mongoose = require("mongoose")

const categoriesSchema = new mongoose.Schema({
    title: String,
    imageUrl: String,
})

//Todo: Model name (singular , lower cases)
const Categories = mongoose.model("categories", categoriesSchema)

module.exports=Categories