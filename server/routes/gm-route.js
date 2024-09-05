import express from "express"

import {createGms, getGms, loginGms} from "../controllers/gm-controller.js"

const gmRouter = express.Router();

gmRouter.get('/', getGms);

gmRouter.post('/', createGms);

gmRouter.post('/gms-login', loginGms)

export default gmRouter