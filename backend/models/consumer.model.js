import mongoose from 'mongoose';

const consumerSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Name is required'], trim: true, minLength: 3, maxLength: 50},
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email address']
    },
    password: {type: String, required: true, trim: true, minLength: 6},
    phoneNumber: {type: String, required: true, trim: true, maxLength: 12},
    nic: {type: String, required: true, trim: true, maxLength: 12},
    street: {type: String, required: true, maxLength:50},
    city: {type: String, required: true, maxLength:50},
    consumerType: {type: String, required: true, maxLength:50},
    dilivaryId: {type:mongoose.Schema.Types.ObjectId, ref: 'Dilivary', required: false},
    tokenId: {type:mongoose.Schema.Types.ObjectId, ref: 'Token', required: false},
}, {timestamps: true});

const Consumer = mongoose.model('Consumer', consumerSchema);
export default Consumer;