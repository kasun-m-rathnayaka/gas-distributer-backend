import mongoose from "mongoose";
import RequestModel from "../models/request.model.js";
import Token from "../models/token.model.js";
import generatePassword from "generate-password";

export const getToken = (req, res) => {
    res.send('Hello from token route');
}

export const verifyToken = async (req, res) => {
    try {
        const token = req.params.id;

        const tokenData = await Token.findOne({token: token})

        if (!tokenData) {
            return res.status(404).json({message: "Token not found"})
        }

        res.status(200).json({success: true, data: tokenData})
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const requestToken = async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const {gasType, quantity, requestDate, status, approval, consumerId, outletId } = req.body;

        const newRequset = await RequestModel.create([{
            gasType,
            quantity,
            requestDate,
            status,
            approval,
            consumerId,
            outletId
        }], {session})

        const token = generatePassword.generate({
            length: 6,
            numbers: true,
            symbols: false,
            uppercase: false,
            excludeSimilarCharacters: true
        })
        console.log(token)

        const newToken = await Token.create([{
            token: token,
            requestDate: Date.now(),
            status: "pending",
            expiryDate: Date.now() + 86400000,
            pickupDate: Date.now() + 86400000,
        }], {session})

        await session.commitTransaction()
        session.endSession()

        return res.status(201).json({success: true, message: "New token created", data: {token: newToken, request:newRequset}})
    }
    catch (error) {
        session.abortTransaction()
        session.endSession()
        res.status(500).json({message: error.message})
    }
}