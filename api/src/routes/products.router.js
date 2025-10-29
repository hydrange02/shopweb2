const express = require("express");
const { Product } = require("../models/product.model");

const router = express.Router();

// GET /api/v1/products?page=&limit=&q=
router.get("/", async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "12", 10), 1), 50);
    const q = String(req.query.q || "").trim();

    const filter = q
      ? {
          $or: [
            { title: new RegExp(q, "i") },
            { brand: new RegExp(q, "i") },
            { category: new RegExp(q, "i") },
          ],
        }
      : {};

    const total = await Product.countDocuments(filter);
    const data = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const hasNext = page * limit < total;
    res.json({ data, page, limit, total, hasNext });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/products/:slug
router.get("/:slug", async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug }).lean();
    if (!product) {
      return res.status(404).json({ ok: false, error: { code: "NOT_FOUND", message: "Product not found" } });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;