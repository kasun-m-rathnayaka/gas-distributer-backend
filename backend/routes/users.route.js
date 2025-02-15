import {Router} from "express";
import {getUsers} from "../controllers/users.contoller.js";
import authorize from "../middleware/auth.middleware.js";

const usersRoute = Router();

usersRoute.get('/',authorize, getUsers);

export default usersRoute