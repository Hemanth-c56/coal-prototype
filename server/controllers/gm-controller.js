import Gm from "../models/gm-model.js";
import HttpError from "../models/http-error.js";

const getGms = async (req,res,next)=>{
    try{
        const {company} = req.query;
        const gms = await Gm.find({ company: company });

        res.status(200).json({
            message: 'successfull',
            gms
        })
    }
    catch(err){
        const error = new HttpError("Getting Gms failed, please try again.", 500);
        return next(error);
    }
}

const createGms = async (req,res,next) =>{
    try{
        const {gmName, gmKey, company} = req.body;

        await Gm.create({
            name: gmName,
            key: gmKey,
            company: company
        })

        res.status(200).json({
            message: 'successfull',
        })
    }
    catch(err){
        const error = new HttpError("Creating Gms failed, please try again.", 500);
        return next(error);
    }
}

const loginGms = async (req, res, next)=>{
    try{
        const {gmName, gmKey} = req.body;

        const gm = await Gm.findOne({key: gmKey});

        if(!gm){
            return next(new HttpError("Incorrect Key", 404))
        }

        res.status(200).json({
            message: 'successfull',
            gm
        })
    }
    catch(err){
        const error = new HttpError("Logging Gms failed, please try again.", 500);
        return next(error);
    }
}

export {getGms, createGms, loginGms};