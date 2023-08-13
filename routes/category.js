const express=require("express")
const Categories=require("../models/category")
const mongodb = require("mongodb")
const router=express.Router()


// GET /categories
router.get("/", async (req, res) => {
    try {
        const categories = await Categories.find({})
        res.json(categories)
    } catch (error) {
        console.log("Error: ", error)
    }
})


// GET /categories/:id
router.get("/:id", async (req, res) => {
    try {
        // Todo: Check if id is valid
        const id = req.params.id
        const objectId = mongodb.ObjectId

        if (!objectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid category id" })
        }



        const category = await Categories.findOne({ _id: id })
        if (category == null) {
            return res.status(404).json({ message: "No category found" })
        }

        res.json(category)
    } catch (error) {
        console.log("Error: ", error)
    }
})

// DELETE /categories/:id
router.delete("/:id", async (req, res) => {
    try {
        // Todo: Check if id is valid
        const id = req.params.id

        const objectId = mongodb.ObjectId

        if (!objectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid category id" })
        }
        // Todo: Check if id exist
        const category = await Categories.deleteOne({ _id: id })
        if (category == null) {
            return res.status(404).json({ message: "No category found" })
        }

        res.json(category)
    } catch (error) {
        console.log("Error: ", error)
    }
})

//POST categories/
router.post("/", async (req, res) => {
    console.log(req.body)
    try {
        const title = req.body.title
        const imageUrl = req.body.imageUrl

        // Todo: Data validation
        if (title=="") {
           return res.json({message:"category name is required."})
        }

        const newCategory = new Categories(
            {
                title,
                imageUrl,

            }
           
        )
        newCategory.save().then(()=>{
            res.send({message:"category is created"})
        }).catch((error)=>{
            res.status(500).json({message:"failed to created category",error:error})
        })




    } catch (error) {
        console.log(error)
    }

})


module.exports=router