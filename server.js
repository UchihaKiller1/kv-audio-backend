import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken";

const app = express();

app.use(bodyParser.json());

app.use((req,res,next)=>{


    let token = req.header("Authorization");

    if(token!=null) {

        token = token.replace("Bearer ","");
        console.log(token)
        jwt.verify(token, "Amindu123",(err,decoded)=>{

            console.log(err);
            if(!err){
                req.user = decoded ;
            }
        })
    }

    next()
})


let mongoURL = "mongodb+srv://amindu:Amindu123@cluster0.asoau.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

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