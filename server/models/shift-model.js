import mongoose from "mongoose"

const shiftSchema = mongoose.Schema({
    fromTime: {
        type: String,
        required: true
    },
    toTime: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    operators: [{
        type: mongoose.Types.ObjectId,
        ref: 'Operator'
    }]
})

const Shift = mongoose.model('Shift', shiftSchema);

export default Shift;