const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const { category, cursor, limit = 20 } = req.query;

    let query = {};

    // ✅ filter by category
    if (category) {
      query.category = category;
    }

    // ✅ cursor pagination
    if (cursor) {
      const decoded = JSON.parse(
        Buffer.from(cursor, "base64").toString()
      );

      query.$or = [
        { updated_at: { $lt: new Date(decoded.updated_at) } },
        {
          updated_at: new Date(decoded.updated_at),
          _id: { $lt: decoded._id }
        }
      ];
    }

    const products = await Product.find(query)
      .sort({ updated_at: -1, _id: -1 })
      .limit(parseInt(limit));

    // ✅ next cursor
    let nextCursor = null;

    if (products.length > 0) {
      const last = products[products.length - 1];

      nextCursor = Buffer.from(
        JSON.stringify({
          updated_at: last.updated_at,
          _id: last._id
        })
      ).toString("base64");
    }

    res.json({
      data: products,
      nextCursor
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;