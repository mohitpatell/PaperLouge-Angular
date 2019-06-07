const express= require('express');
const routes= express.Router();

const Biographies = require('../model/biographies');
const Novel = require('../model/novel');
const Buisness = require('../model/buisness');
const Technology = require('../model/technology');
const SelfHelp = require('../model/self-help');
const Science = require('../model/science');
routes.get('/biographies',(req,res)=>{

    Biographies.find({})
        .then((response)=>{
            res.json({
                books:response
            })
        })
    
})
routes.get('/novel',(req,res)=>{
        
    Novel.find({})
        .then((response)=>{
            res.json({
                books:response
            })
        })
})

routes.get('/buisness',(req,res)=>{
        
    Buisness.find({})
        .then((response)=>{
            res.json({
                books:response
            })
        })
})

routes.get('/technology',(req,res)=>{
        
    Technology.find({})
        .then((response)=>{
            res.json({
                books:response
            })
        })
})

routes.get('/selfhelp',(req,res)=>{
        
    SelfHelp.find({})
        .then((response)=>{
            res.json({
                books:response
            })
        })
})

routes.get('/science',(req,res)=>{
        
    Science.find({})
        .then((response)=>{
            res.json({
                books:response
            })
        })
})


module.exports=routes;