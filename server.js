const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/products", productRoutes);

// simple test route
app.get("/", (req, res) => {
  res.send("Server is running ");
});

// connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB Error:", err);
  });

// start server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});
