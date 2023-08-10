import express from "express";
import colors from "colors";
import dotenv from 'dotenv';
import Connectdb from "./config/db.js";
import morgan from "morgan";
import authrouter from './routes/authrouter.js'
import { loginController, testcontrolar } from "./controllers/authcontrol.js";
import categoryRouts from './routes/categoryRouts.js'
import productRoute from './routes/productRoute.js'
import cors from "cors";



//configure env
dotenv.config()

// Connectdb()
Connectdb();

//



// const { bgCyan } = require('colors')
// const express =require('express')
// const colors=require('colors')
//rest object
const app = express();
app.use(express.json({limit:'35mb'}));
app.use(morgan('dev'));

//======================register post=========================
app.use("/api/v1/auth",authrouter);

//======================Adminpanel===========================
app.use("/api/v1/category",categoryRouts);
app.use("/api/v1/products",productRoute)

//======================login================================
app.use("/app/v1/auth",loginController);
app.use("/app/v1/auth",testcontrolar)



//rest api
app.get('/',(req,res)=>{
    res.send(
       "<h1> message : welcome to mubeen app </h1>"
)
})

//port
const PORT=process.env.PORT ;

app.listen(PORT,()=>{
    console.log(`server running ${PORT}`.bgCyan.white)
})
