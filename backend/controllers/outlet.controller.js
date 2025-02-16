import mongoose from "mongoose";
import Outlet from "../models/outlet.model.js";
import gasstockModel from "../models/gasstock.model.js";

export const getOutlets = async (req, res) => {
    try {
        const outlets = await Outlet.find().select('-password');
        
        if(outlets){
            for(let i = 0; i < outlets.length; i++){
                const stock = await gasstockModel.findById(outlets[i].stockId);
                if (stock){
                    outlets[i] = outlets[i].toObject();
                    outlets[i].stock = stock
                }
            }
        }

        res.status(200).json({success: true, data: outlets})
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateStatus = async (req, res) => {
    try {
        const {id} = req.params;
        const {status} = req.body;

        const outlet = await Outlet.findById(id);
        if (!outlet) return res.status(404).json({message: "Outlet not found"});

        if (outlet.stockId){
            const stock = await gasstockModel.findById(outlet.stockId);
            if (stock){
                stock.status = status;
                await stock.save();
            }
        }

        res.status(200).json({success: true, message: "Outlet status updated"})
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}