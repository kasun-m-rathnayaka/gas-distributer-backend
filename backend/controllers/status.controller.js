import mongoose from "mongoose";
import RequestModel from "../models/request.model.js";
import Outlet from "../models/outlet.model.js";
import Gasstock from "../models/gasstock.model.js";

export const changeStatus = async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const {id, status} = req.body

        await RequestModel.findByIdAndUpdate(id, {status}, {session})

        await session.commitTransaction()
        await session.endSession()
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        res.status(500).json({message: error.message})
    }
}

export const checkStatus = async (req, res) => {
    try {
        const id = req.params.id

        const outlet = await Outlet.findById(id)

        if (!outlet) {
            return res.status(404).json({message: "Outlet not found"})
        }

        const stock = await Gasstock.findById(outlet.stockId)


        res.status(200).json({success: true, data: {stock: stock, outlet: outlet}})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}