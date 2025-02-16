import {Router} from "express";
import {getOutlets, updateStatus} from "../controllers/outlet.controller.js";

const outletRoute = Router();

outletRoute.get('/', getOutlets);
outletRoute.patch('/:id', updateStatus);

export default outletRoute