import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 100
    },
    type: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 100
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);
export default Product;