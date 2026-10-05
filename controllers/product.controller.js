import Product from "../models/product.model.js";
import Transaction from "../models/transaction.model.js";

export const createProduct = async (req, res, next) => {
    try {
        const { name, price, stock } = req.body;
        const userId = req.userId
        if (!name || price === undefined || stock === undefined) {
            return res.status(400).json({
                message: "Name, price and stock are required"
            });
        }

        if (price <= 0) {
            return res.status(400).json({
                message: "Price must be greater than zero"
            });
        }

        if (stock < 0) {
            return res.status(400).json({
                message: "Stock cannot be negative"
            });
        }

        const existingProduct = await Product.findOne({ name });

        if (existingProduct) {
            return res.status(409).json({
                message: "Product name already exists"
            });
        }

        const product = await Product.create({
            name,
            price,
            stock,
            userId
        });

        res.status(201).json({
            message: "Product created successfully",
            product
        });
    } catch (error) {
        next(error);
    }
};

export const getProducts = async (req, res, next) => {
    try {
        const userId = req.userId
        const products = await Product.find({ userId }).sort({
            createdAt: -1
        });

        res.status(200).json({
            products
        });
    } catch (error) {
        next(error);
    }
};

export const purchaseProduct = async (req, res, next) => {
    try {
        const { quantity } = req.body;
        const productId = req.params.productId
        const userId = req.userId

        if (!productId || quantity === undefined) {
            return res.status(400).json({
                message: "Product ID and quantity are required"
            });
        }

        if (quantity <= 0) {
            return res.status(400).json({
                message: "Purchase quantity must be greater than zero"
            });
        }

        const product = await Product.findOne({ _id: productId, userId });

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        if (quantity > product.stock) {
            return res.status(400).json({
                message: "Insufficient stock"
            });
        }

        product.stock -= quantity;

        await product.save();

        const transaction = await Transaction.create({
            product: product._id,
            type: "Purchase",
            quantity,
            userId
        });

        res.status(200).json({
            message: "Product purchased successfully",
            transaction
        });
    } catch (error) {
        next(error);
    }
};

export const restockProduct = async (req, res, next) => {
    try {
        const { quantity } = req.body;
        const productId = req.params.productId;
        const userId = req.userId

        if (!productId || quantity === undefined) {
            return res.status(400).json({
                message: "Product ID and quantity are required"
            });
        }

        if (quantity <= 0) {
            return res.status(400).json({
                message: "Restock quantity must be greater than zero"
            });
        }

        const product = await Product.findOne({ _id: productId, userId });

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        product.stock += quantity;

        await product.save();

        const transaction = await Transaction.create({
            product: product._id,
            type: "Restock",
            quantity,
            userId
        });

        res.status(200).json({
            message: "Product restocked successfully",
            product,
        });
    } catch (error) {
        next(error);
    }
};

export const getProductHistory = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const userId = req.userId

        const product = await Product.findById({_id : productId, userId});

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const transactions = await Transaction.find({
            product: productId
        }).sort({
            createdAt: -1
        });

        res.status(200).json({
            product,
            transactions
        });
    } catch (error) {
        next(error);
    }
};