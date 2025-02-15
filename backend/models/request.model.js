import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    gasType: {
        type: String,
        required: true,
        enum: ['LPG', 'CNG', 'Propane'],
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be a positive number"],
        max: [1000, "Quantity must be less than 1000"]
    },
    requestDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    consumerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consumer',
        required: true
    },
    tokenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Token',
        required: false
    },
    outletId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Outlet',
        required: true
    },

}, {timestamps: true});

const Request = mongoose.model('Request', requestSchema);
export default Request;