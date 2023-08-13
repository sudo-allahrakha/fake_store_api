const mongoose = require("mongoose")
const dotenv=require("dotenv")
dotenv.config();

module.exports={
    connect:function (){
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => {
                console.log("Database is connected.")
            }).catch((err) => {
                console.log("Error connecting to MongoDB", err)
            })
        
        }
        }


