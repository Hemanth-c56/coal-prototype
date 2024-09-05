import express from "express"

import { getShifts, createShifts, getSpecificShift, addOperatorsToShift, getShiftOperators, updateShiftDescription } from "../controllers/shift-controller.js";

const shiftRouter = express.Router();

shiftRouter.get('/', getShifts);

shiftRouter.get('/operators/:sid', getShiftOperators)

shiftRouter.get('/:sid', getSpecificShift)

shiftRouter.post('/', createShifts);

shiftRouter.patch("/:sid/operators", addOperatorsToShift);

shiftRouter.patch("/:sid/updateDesc", updateShiftDescription)

export default shiftRouter  