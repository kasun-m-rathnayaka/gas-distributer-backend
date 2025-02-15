import {Router} from "express";
import {signIn, signUp} from "../controllers/auth.controller.js";

const authRoute = Router();

authRoute.post('/sign-in', signIn)
authRoute.post('/sign-up', signUp)

export default authRoute