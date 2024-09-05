import mongoose from "mongoose"

const operatorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'Labour'
    },
    shifts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Shift'
    }]
})

const Operator = mongoose.model('Operator', operatorSchema);

export default Operator;