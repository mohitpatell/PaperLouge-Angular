const express = require('express');
const bcrypt= require('bcryptjs');
const jwt=require('jsonwebtoken');
const route=express.Router();
const UserInfo= require('../model/userdetail');
const TotalCount= require('../model/dashboard_count');
const nodemailer= require('nodemailer');
const passport= require('passport');
const passportConf= require('../passport');

//Transpoter for sending mails
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'paperlouge@gmail.com',
        pass: 'readpaper'
    }
});

// FaceBook login
route.get('/auth/facebook', passport.authenticate('facebook'));

route.get('/auth/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: '/login' }),
  (req,res)=>{
    console.log('request is HRITIK',req.user.username ,req.user.picture);
    res.render('dashboard',{
        name:req.user.username,
        email:req.user.email});
     
    });                                 

// Google Login

route.get('/auth/google',
passport.authenticate('google', { scope: ['email','profile'] }));

route.get('/auth/google/callback', 
 passport.authenticate('google', {failureRedirect: 'https://paperlouge.herokuapp.com/' }),
 ( req, res) => {
return  res.redirect('https://paperlouge.herokuapp.com/');
 });

//  Create Account Request
route.post('/signup',(req,res)=>{
    console.log(req.body.email,req.body.name)
    const temptoken =jwt.sign({
                                userid:req.body.username
                                },'hdgbwsjd656xw75xw867$%%$%^*%$$&^^^&%^&');
    bcrypt.hash(req.body.password,10)
          .then((hashpassword)=>{
              const userInfo=new UserInfo({
                     name:req.body.name,
                     username:req.body.username,
                     email:req.body.email,
                     password:hashpassword,
                     verified:false,
                     gender:req.body.gender,
                     lastlogin:'Not Login Yet',
                     token:temptoken
              });

              let sendingMail =  {
                from: '"PaperLouge 👻" <paperlouge@gmail.com>', // sender address
                to: req.body.email, // list of receivers
                subject: "Verify Account✔", // Subject line
                text: "Hello world?", // plain text body
                html: `
                        <h4>Hello Welcome to PaperLouge<h4>
                        <p>Click on the link to Verify Your Account <a href="https://sheltered-forest-96439.herokuapp.com/activate/` +temptoken+`">https://sheltered-forest-96439.herokuapp.com/activate/`+temptoken+`
                        </a>`
                        // html body
              };

              userInfo.save()
                     .then(()=>{
                        transporter.sendMail(sendingMail,(error,info)=>{
                            if(error){
                                console.log(error);
                            }
                            else{
                                console.log("Email Sent", info.response);
                            }
                        })
                        TotalCount.update({_id:'5d0a7c6f13fe8c1fe581943a'},{ $inc: { user: 1 }})
                        .then(response=>console.log(response))
                         return res.status(201).json({
                             message:"Account Created Please Verify Your Email to activate your account!!"
                         })
                     })
                     .catch((err)=>{
                            res.status(500).json({
                                message:err.message
                            })
                     })

          })
          .catch((err)=>{
            new Promise(() => { throw new Error('exception!'); });
                console.log(err);
        })
})

// Sending Token to Verify Email
route.get('/activate/:token',(req,res)=>{

    //console.log(req.params.token);
    UserInfo.findOne({token:req.params.token})
    .then((response)=>{
        token=response.token;
        //console.log(token);

        const verification_result=jwt.verify(token,'hdgbwsjd656xw75xw867$%%$%^*%$$&^^^&%^&');

        //console.log('verification_result',verification_result);
        username=verification_result.userid;
        //console.log("Token Username",username);
        UserInfo.update({username:username},{$set:{verified:true}})
        .then((result)=>{
            console.log(result);
            return res.json({
                message:"Account Verified"
            })
        })
       // console.log("Token Status",response);
    })
    .catch(err=>{
        return res.json({
            message:"Invalid Token Sent"
        })
    })


})

// Login route request
route.post('/login',(req,res)=>{
    let user;
    UserInfo.findOne({username:req.body.username})
            .then((response)=>{
                if(!response){
                   return res.status(401).json({
                        message:"Username Not Found"
                    })
                }
                user=response;
                //console.log(response);
                if(response.verified!=true){
                    res.status(400).json({
                        message:"Email Not Verified"
                    })
                }
                return bcrypt.compare(req.body.password,response.password)
            })
            .then((response)=>{
                //console.log(response);
                if(!response){
                    return res.status(400).json({
                        message:"Incorrect Password"
                    })
                }
                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                //console.log(date,time)
                //console.log(user._id);
                UserInfo.update({username:req.body.username}, {$set: {lastlogin:`${date},${time}`}})
                .then(response=>res.json({message:"login time updated"}))
                .catch(err=>console.log(err));

                //console.log(date,time)
                const token = jwt.sign({
                    username:user.username,
                    userid:user._id
                },'token!!*&%^&$#for*/+the@#$!user')

                res.status(201).json({
                        message:"Login Successfull",
                        token:token
                })
                
            })
            .catch(err =>{
                console.log(err);
              return res.status(401).json({
                  message:"Invalid Email or Password"
            });
  
      })
})

// use to reset password of user here a mail with a link is send to email and then from the link it goes to newpassword page
route.post('/resetpassword',(req,res)=>{
    const user=req.body.username;
    console.log(user)
    UserInfo.findOne({username:user})
    .then((response)=>{
        if(!response){
           return res.status(404).json({
                message:"Enter a Valid Username"
            })
        }
        const userId=response._id;
        const email=response.email;

        const temptoken =jwt.sign({
            userid:userId
            },'hdgbwsjd6reset#@$%^!*pass^%word56xw75xw867$%%$%^To$#ken&%^&');

            let sendingMail =  {
                from: '"PaperLouge 👻" <paperlouge@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Reset Password✔", // Subject line
                text: "Hello world?", // plain text body
                html: `
                        <h4>Reset Password<h4>
                        <p>Click on the link to Reset your Password <a href="https://paperlouge.herokuapp.com/resetpassword/` +temptoken+`">https://paperlouge.herokuapp.com/resetpassword/`+temptoken+`
                        </a>`
                        // html body
              };
              
              transporter.sendMail(sendingMail,(error,info)=>{
                if(error){
                    console.log(error);
                }
                else{
                    console.log("Email Sent", info.response);
                }
            })

            return res.json({
                message:"A verification Link has been send to your Register Email Please open link to reset password"
            })
    })
})


// This is to verify the token send with the password change link
route.post('/reset',(req,res)=>{

    const token =req.body.token;
    const password =req.body.password
    const verification_result=jwt.verify(token,'hdgbwsjd6reset#@$%^!*pass^%word56xw75xw867$%%$%^To$#ken&%^&');
    bcrypt.hash(password,10)
        .then((hashpassword)=>{
            const user=verification_result.userid;
            UserInfo.findByIdAndUpdate(user,{password:hashpassword})
            .then((response)=>{
                return res.json({
                    message:"Password Updated Successfully"
                })
            })
        })


    .catch((err)=>{
        return res.json({
            message:"Token Expired"
        })
    })
    })


module.exports=route;