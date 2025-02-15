import mongoose from "mongoose";

const fullfillSchema = new mongoose.Schema({
    requestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
        required: true
    },
    diliveyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Delivery',
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, {timestamps: true});

const Fullfill = mongoose.model('Fullfill', fullfillSchema);
export default Fullfill;