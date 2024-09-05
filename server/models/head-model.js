import mongoose from "mongoose"

const headSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lisence: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    post: {
        type: String,
        default: "Head"
    }
})

const Head = mongoose.model('Head', headSchema);

export default Head;