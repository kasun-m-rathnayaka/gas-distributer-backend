import {Router} from "express";
import {changeStatus, checkStatus} from "../controllers/status.controller.js";

const statusRoute = Router();

statusRoute.patch('/', changeStatus);
statusRoute.get('/:id', checkStatus);

export default statusRoute