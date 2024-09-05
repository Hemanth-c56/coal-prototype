import express from "express"
import bodyParser from "body-parser";
import cors from "cors"

import HttpError from "./models/http-error.js";
import headRouter from "./routes/head-route.js";
import gmRouter from "./routes/gm-route.js";
import Connection from "./db/db.js"
import shiftRouter from "./routes/shift-router.js";
import operatorsRouter from "./routes/operator-route.js";
import notificationRouter from "./routes/notification-route.js";

const app = express();
const port = 5000;

Connection();

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//routes
app.use('/api/v1/heads', headRouter);

app.use('/api/v1/gms', gmRouter)

app.use('/api/v1/shifts', shiftRouter)

app.use('/api/v1/operators', operatorsRouter)

app.use('/api/v1/notifications', notificationRouter)

app.use((req,res,next)=>{
    const error = new HttpError('Could not find this route', 404)
    throw error;
})

app.use((error, req, res, next)=>{
    if(res.headerSend){
        return next(error);
    }
    else{
        res.status(error.code || 500).json({
            message: error.message || 'An unknown error occured' 
        })
    }
})

app.listen(port , ()=>{
    console.log(`server started at port ${port}`);
})