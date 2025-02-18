import mongoose from "mongoose";
import Consumer from "../models/consumer.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import {JWT_EXPIRE, JWT_SECRET} from "../config/env.js";

export const signUp = async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const {
            firstname,
            lastname,
            username,
            email,
            password,
            contactNumber,
            streetLine1,
            streetLine2,
            city
        } = req.body.formData;

        const existingUser = await Consumer.findOne({email})

        if (existingUser) {
            return res.status(409).json({message: "User already exists"})
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await Consumer.create([{
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,
            contactNumber,
            street: streetLine1 + ' ' + streetLine2,
            city
        }], {session})

        const token = jwt.sign({
            email: newUser.email,
            id: newUser._id,
            username: username
        }, JWT_SECRET, {expiresIn: JWT_EXPIRE})

        await session.commitTransaction()
        session.endSession()

        res.status(201).json({success: true, message: "New user created", data: {user: newUser, token}})

    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        res.status(500).json({message: error.message})

    }
}

export const signIn = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await Consumer.findOne({username: username})

        if (!user) {
            return res.status(404).json({message: "User not found"})
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(401).json({message: "Invalid credentials"})
        }

        const token = jwt.sign({email: user.email, id: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRE})
        res.status(200).json({success: true, data: user, token: token})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}