const express= require('express');
const bodyParser= require('body-parser');
const app= express();
const passport = require('passport');
const StripePayment= require('./routes/stripe');
const userRoutes=require('./routes/auth');
const listbooks=require('./routes/listbooks');
const bookdescription=require('./routes/bookdescription');
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

const mongoose = require('mongoose');

const db=mongoose.connect('mongodb+srv://mohit:mohit787@cluster0-nfvm2.mongodb.net/PaperLouge')
        .then(()=>
        {console.log("Connection to MongoDB is Successfull !");
    })
        .catch(()=> {
            console.log("Connection to Database Failed !");
        });
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization,Null"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS",
    );
    next();
  });
  
  app.use('/',userRoutes); 
  
  app.get('/',(req,res)=>{
    res.json({
      message:"Success"
    })
  })
  app.post('/',(req,res)=>{
    res.json({
      message:"Success"
    })
  })
  app.use('/list',listbooks);
  app.use('',StripePayment);
  
  app.use('/bookdescription',bookdescription);

  app.use('/',StripePayment);
module.exports = app;