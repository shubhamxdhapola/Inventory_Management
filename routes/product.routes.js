import express from "express";

import {
  createProduct,
  getProducts,
  purchaseProduct,
  restockProduct,
  getProductHistory
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createProduct);

router.get("/", getProducts);

router.post("/purchase/:productId", purchaseProduct);

router.post("/restock/:productId", restockProduct);

router.get("/:productId/history",getProductHistory);

export default router;