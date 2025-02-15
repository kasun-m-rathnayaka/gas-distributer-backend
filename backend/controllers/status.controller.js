import mongoose from "mongoose";
import RequestModel from "../models/request.model.js";

export const changeStatus = async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const {id, status} = req.body

        const newStatus = await RequestModel.findByIdAndUpdate(id, {status}, {session})

        await session.commitTransaction()
        await session.endSession()
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        res.status(500).json({message: error.message})
    }
}