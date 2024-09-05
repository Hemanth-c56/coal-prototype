import express from "express"
import { getOperators, getOperatorShifts } from "../controllers/operator-controller.js";


const operatorsRouter = express.Router();

operatorsRouter.get('/', getOperators);

operatorsRouter.get('/:oid/shifts', getOperatorShifts);

export default operatorsRouter  