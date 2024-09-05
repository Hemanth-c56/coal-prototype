import HttpError from "../models/http-error.js";
import Operator from "../models/operator-model.js";

const getOperators = async(req,res,next)=>{
    try{
       const operators = await Operator.find();

        res.status(200).json({
            message: 'successfull',
            operators
        })

    }   
    catch(err){
        const error = new HttpError("reading shifts failed", 500);
        return next(error);
    }
}

const getOperatorShifts = async (req, res, next) => {
    const operatorId = req.params.oid;
  
    try {
      const operator = await Operator.findById(operatorId).populate('shifts');
      if (!operator) {
        const error = new HttpError("Operator not found", 404);
        return next(error);
      }
  
      res.status(200).json({
        message: "Successful",
        shifts: operator.shifts
      });
    } catch (err) {
      const error = new HttpError("Fetching shifts failed", 500);
      return next(error);
    }
  };

export {getOperators, getOperatorShifts}