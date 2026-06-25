const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("../models/Product");

const categories = ["electronics", "fashion", "books", "home", "sports"];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected for seeding...");

    const products = [];

    for (let i = 0; i < 200000; i++) {
      products.push({
        name: `Product ${i}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        price: Math.floor(Math.random() * 1000),
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    await Product.insertMany(products);

    console.log("200,000 products inserted!");
    process.exit();

  } catch (err) {
    console.log(err);
  }
}

seedData();