import {Router} from "express";
import {verifyToken, requestToken} from "../controllers/token.controller.js";

const tokenRoute = Router();

tokenRoute.post('/request', requestToken);
tokenRoute.get('/:id', verifyToken);

export default tokenRoute