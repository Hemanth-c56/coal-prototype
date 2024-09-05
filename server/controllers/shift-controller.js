import HttpError from "../models/http-error.js";
import Shift from "../models/shift-model.js"
import Operator from "../models/operator-model.js";

const getShifts = async (req, res, next)=>{
    try{
        const shifts = await Shift.find();

        res.status(200).json({
            message: 'successfull',
            shifts
        })

    }   
    catch(err){
        const error = new HttpError("reading shifts failed", 500);
        return next(error);
    }
}

const createShifts = async (req, res, next)=>{
    try{
        const {fromTime, toTime} = req.body;

        const newShift = await Shift.create({
            fromTime,
            toTime,
            operators: [],
            description: ""
        })

        res.status(200).json({
            message: "successfull",
            newShift
        })
    }   
    catch(err){
        const error = new HttpError("creating shifts failed", 500);
        return next(error);
    }
}

const getSpecificShift = async (req,res,next)=>{
    try{
        const shiftId = req.params.sid;

        const shift = await Shift.findOne({_id: shiftId})

        res.status(200).json({
            message: "successfull",
            shift
        })
    }   
    catch(err){
        const error = new HttpError("creating shifts failed", 500);
        return next(error);
    }
}

const addOperatorsToShift = async (req, res, next) => {
    const { operators } = req.body; // array of operator IDs
    const shiftId = req.params.sid;

    try {
        const shift = await Shift.findById(shiftId);
        if (!shift) {
            const error = new HttpError("Shift not found", 404);
            return next(error);
        }

        shift.operators.push(...operators);
        await shift.save();

        // Adding shiftId to each operator's shifts array
        await Operator.updateMany(
            { _id: { $in: operators } }, // find operators whose IDs are in the operators array
            { $push: { shifts: shiftId } } // add shiftId to their shifts array
        );

        res.status(200).json({
            message: "Operators added successfully",
            shift
        });
    } catch (err) {
        const error = new HttpError("Adding operators failed", 500);
        return next(error);
    }
};

const getShiftOperators = async (req, res, next)=>{
    try {
        const shiftId = req.params.sid;
        const shift = await Shift.findById(shiftId).populate('operators');

        if (!shift) {
            const error = new HttpError("Shift not found", 404);
            return next(error);
        }

        res.status(200).json({
            message: "successful",
            shift
        });
    } catch (err) {
        const error = new HttpError("Fetching shift failed", 500);
        return next(error);
    }
}

const updateShiftDescription = async (req, res, next) => {
    const shiftId = req.params.sid;
    const { description } = req.body;

    try {
        const shift = await Shift.findById(shiftId);
        if (!shift) {
            const error = new HttpError("Shift not found", 404);
            return next(error);
        }

        shift.description = description;
        await shift.save();

        res.status(200).json({
            message: "Shift description updated successfully",
            shift
        });
    } catch (err) {
        const error = new HttpError("Updating shift description failed", 500);
        return next(error);
    }
};

export {getShifts, createShifts, getSpecificShift, addOperatorsToShift, getShiftOperators, updateShiftDescription}