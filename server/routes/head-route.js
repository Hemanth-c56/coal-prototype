import express from 'express'

import { createHeads, getHeads } from "../controllers/head-controller.js"

const headRouter = express.Router();

headRouter.get('/', getHeads);

headRouter.post('/', createHeads);

export default headRouter;