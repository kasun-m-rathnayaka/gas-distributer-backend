import mongoose from "mongoose";

const outletSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 100
    },
    location: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 1000
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    },
    stockId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
        required: true
    },
}, {timestamps: true});

const Outlet = mongoose.model('Outlet', outletSchema);
export default Outlet;