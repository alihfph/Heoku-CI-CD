import mongoose from "mongoose"
const { Schema } = mongoose

const ProductsSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true })

export default ProductsSchema