import mongoose from "mongoose"

const notificationSchema = mongoose.Schema({
    description:{
        type: String,
        required: true
    },
    addressingTo:{
        type: String,
        required: true
    },
})

const Notification = mongoose.model('notifications', notificationSchema);

export default Notification