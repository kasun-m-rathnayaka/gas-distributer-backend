import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        min: [0, "Amount must be a positive number"],
        max: [1000, "Amount must be less than 1000"]
    },
    paymentMethod: {type: String, required: true, trim: true},
    paymentStatus: { type: String, required: true, enum: ['success', 'failed', 'pending'] },
    consumerId: {type:mongoose.Schema.Types.ObjectId, ref: 'Consumer', required: true},
}, {timestamps: true});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;