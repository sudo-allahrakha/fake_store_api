const express = require("express");
const morgan = require("morgan");
const cors=require("cors");
const categoryRoutes = require("./routes/category");
const productRoutes=require("./routes/product");
const userRoutes = require("./routes/user");
const db=require("./config/db");



const port = process.env.PORT || 3000;
const host=process.env.HTTP_HOST || '0.0.0.0';

const app = express();
app.use(morgan("dev"));
app.use(cors())
app.use(express.json());


db.connect()

app.get("/", (req, res) => {
  res.send(`Server is runnig at ${port}...`);
});

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);



app.listen(port, host,() => {
  console.log(`Server is running at ${port} ....`);
});
