import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0.01
    },

    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    }
}, { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;