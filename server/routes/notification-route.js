import express from "express"

import {createNotifications, getNotifications} from "../controllers/notification-controller.js"

const notificationRouter =  express.Router();

notificationRouter.get('/', getNotifications);

notificationRouter.post('/', createNotifications);

export default notificationRouter