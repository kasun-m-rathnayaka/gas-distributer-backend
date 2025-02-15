import {Router} from "express";
import {changeStatus} from "../controllers/status.controller.js";

const statusRoute = Router();

statusRoute.patch('/', changeStatus);

export default statusRoute