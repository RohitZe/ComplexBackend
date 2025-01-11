//require('dotenv').config({path:'./env'})
import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./db/index.js";

const app=express();

dotenv.config({
    path:'./env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`Server is running :${process.env.PORT}`);
    });
})
.catch((err)=>{
    console.log("MongoDb connection failed re baba",err);
});