import HttpError from "../models/http-error.js";
import Notification from "../models/notification-model.js";

const getNotifications = async (req,res,next)=>{
    try{
        const notifications = await Notification.find();

        res.status(200).json({
            message : 'successfull',
            notifications
        })
    }   
    catch(err){
        const error = new HttpError("Reading Notifications failed", 500);
        return next(error);
    }
}

const createNotifications = async (req,res,next) =>{
    try{
        
        const {description, designation} = req.body;

        await Notification.create({
            description,
            addressingTo: designation
        })

        res.status(200).json({
            message : 'successfull',
        })
    }   
    catch(err){
        const error = new HttpError("Creating Notifications failed", 500);
        return next(error);
    } 
}

export {createNotifications, getNotifications}