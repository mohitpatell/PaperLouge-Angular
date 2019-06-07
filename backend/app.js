const express= require('express');
const bodyParser= require('body-parser');
const app= express();
const nodemailer= require('nodemailer')
const session = require('express-session')
const cors = require('cors');
const passport = require('passport');

const userRoutes=require('./routes/auth');
const listbooks=require('./routes/listbooks');
const bookdescription=require('./routes/bookdescription');
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mohit:mohit787@cluster0-nfvm2.mongodb.net/PaperLouge')
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
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS",
    );
    next();
  });

  // app.get('/auth/google',
  // passport.authenticate('google', { scope: ['email','profile'] }));
 
  // app.get('/auth/google/callback', 
  //  passport.authenticate('google', { failureRedirect: '/login' }),
  //  (err, req, res, next) => {
  //   console.log("Zero",req.response); // custom error handler to catch any errors, such as TokenError
  //    if (err.name === 'TokenError') {
  //     res.redirect('/'); // redirect them back to the login page
  //    } else {
  //      console.log("First",req.response);
  //     res.redirect('/');
  //     // Handle other errors here
  //    }
  //    console.log("Second",req.response);
  //    res.redirect('/');
  //  });
  //  app.post('/auth/google/callback', 
  //  passport.authenticate('google', { failureRedirect: '/login' }),
  //  (err, req, res, next) => { 
  //   console.log("Zero",req.response);// custom error handler to catch any errors, such as TokenError
  //    if (err.name === 'TokenError') {
  //     res.redirect('/'); // redirect them back to the login page
  //    } else {
  //      console.log("First",req.response);
  //     redirect('/');
  //     // Handle other errors here
  //    }
  //    console.log("Second",req.response);
  //    res.redirect('/');
  //  });

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

  app.use('/bookdescription',bookdescription);
module.exports = app;