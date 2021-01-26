import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import Users from './routes/users.js';
import product from './routes/product.js';
import mongoose from 'mongoose';


const app=express();
dotenv.config();
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());


app.use('/authenticate',Users);
app.use('/product',product);


const PORT =process.env.PORT || 5000
mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
    .then(()=>app.listen(PORT,()=>console.log(`Server running in port:${PORT}`)))
    .catch((error)=>console.log(error.message));

mongoose.set('useFindAndModify',false);

