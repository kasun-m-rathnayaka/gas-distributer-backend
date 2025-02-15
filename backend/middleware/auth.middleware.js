import {JWT_SECRET} from "../config/env.js";
import jwt from "jsonwebtoken";
import Consumer from "../models/consumer.model.js";

const authorize = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({message: "Unauthorized"});
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const consumer = await Consumer.findById(decoded.id);

        if (!consumer) {
            return res.status(404).json({message: "Consumer not found"});
        }
        req.consumer = consumer;
        next();
    } catch (error) {
        res.status(401).json({message: "Unauthorized", error: error});
    }
}

export default authorize;