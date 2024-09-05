import mongoose from 'mongoose'

const gmModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    key: {
        type: Number,
        required: true
    },
    post: {
        type: String,
        default: 'Gm'
    },
    company: {
        type: String,
        required: true
    }
})

const Gm = mongoose.model('Gm', gmModel);

export default Gm