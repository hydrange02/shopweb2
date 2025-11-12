const express = require("express");
const { Product } = require("../models/product.model");

const { createProduct, updateProduct, deleteProduct } = require("../controllers/products.controller");
const { createProductSchema, updateProductSchema } = require("../schemas/product.dto");
const { validate } = require("../middlewares/validate");
const { asyncHandler } = require("../utils/async");

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


// (Giữ nguyên các route GET list/detail đã có)

// Create
router.post("/", validate(createProductSchema, "body"), asyncHandler(createProduct));

// Update by id
router.patch("/:id", validate(updateProductSchema, "body"), asyncHandler(updateProduct));

// Delete by id
router.delete("/:id", asyncHandler(deleteProduct));

const { requireAuth, requireRole } = require("../middlewares/auth");

// Create
router.post("/", requireAuth, requireRole("admin"), validate(createProductSchema, "body"), (req, res, next) =>
  Promise.resolve(createProduct(req, res, next)).catch(next)
);

// Update
router.patch("/:id", requireAuth, requireRole("admin"), validate(updateProductSchema, "body"), (req, res, next) =>
  Promise.resolve(updateProduct(req, res, next)).catch(next)
);

// Delete
router.delete("/:id", requireAuth, requireRole("admin"), (req, res, next) =>
  Promise.resolve(deleteProduct(req, res, next)).catch(next)
);

module.exports = router;