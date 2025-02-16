import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use((req,res,next)=>{


    let token = req.header("Authorization");

    if(token!=null) {

        token = token.replace("Bearer ","");
        console.log(token)
        jwt.verify(token, process.env.JWT_SECRET,(err,decoded)=>{

            console.log(err);
            if(!err){
                req.user = decoded ;
            }
        })
    }

    next()
})


let mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL);
let connection = mongoose.connection;
connection.once("open", ()=>{

    console.log("MongoDB connection established successfully")
})



app.listen(4000, ()=>{

    console.log('listening on port 4000')

});


app.use("/api/users",userRouter)
app.use("/api/product",productRouter)