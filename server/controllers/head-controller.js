import Head from "../models/head-model.js"
import HttpError from "../models/http-error.js";

const getHeads = async (req, res, next)=>{
    try{
        const heads = await Head.find();

        res.status(200).json({
            message: "successfull",
            heads
        })
    }   
    catch(err){
        const error = new HttpError("Reading heads failed, please try again.", 500);
        return next(error);
    }
}

const createHeads = async (req, res, next)=>{
    try{
        const {name, lisence, company} = req.body;

        let head = await Head.findOne({lisence})

        if(head){
            return res.status(200).json({
                message: 'successfull',
                head
            })
        }

        head = await Head.create({
            name,
            lisence,
            company
        })

        res.status(200).json({
            message: 'successfull',
            head
        })
    }
    catch(err){
        const error = new HttpError("Creating Heads failed, please try again.", 500);
        return next(error);
    }
}

export {getHeads, createHeads}