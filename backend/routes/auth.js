const express = require('express');
const bcrypt= require('bcryptjs');
const jwt=require('jsonwebtoken');
const route=express.Router();
const UserInfo= require('../model/userdetail');
const nodemailer= require('nodemailer');
const passport= require('passport');
const passportConf= require('../passport');
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'paperlouge@gmail.com',
        pass: 'readpaper'
    }
});

route.get('/auth/google',
passport.authenticate('google', { scope: ['email','profile'] }));

route.get('/auth/google/callback', 
 passport.authenticate('google', { failureRedirect: '/login' }),
 ( req, res) => {
return  res.redirect('http://localhost:4200/');
 });

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
                     token:temptoken
              });

              let sendingMail =  {
                from: '"PaperLouge 👻" <paperlouge@gmail.com>', // sender address
                to: req.body.email, // list of receivers
                subject: "Verify Account✔", // Subject line
                text: "Hello world?", // plain text body
                html: `
                        <h4>Hello Welcome to PaperLouge<h4>
                        <p>Click on the link to Verify Your Account <a href="http://localhost:3000/activate/` +temptoken+`">http://localhost:3000/activate/`+temptoken+`
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

              userInfo.save()
                     .then(()=>{
                         res.status(201).json({
                             message:"Account Created Please Verify Your Email to activate your account!!"
                         })
                     })
                     .catch((err)=>{
                            res.status(500).json({
                                message:err
                            })
                     })

          })
          .catch((err)=>{
            new Promise(() => { throw new Error('exception!'); });
                console.log(err);
        })
})

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
           // console.log(result);
        })
       // console.log("Token Status",response);
    })

    res.json({
        message:"Account Verified"
    })
})

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
              return res.status(401).json({
                  message:"Invalid Email or Password"
            });
  
      })
})

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
                        <p>Click on the link to Reset your Password <a href="http://localhost:4200/resetpassword/` +temptoken+`">http://localhost:4200/resetpassword/`+temptoken+`
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
                message:"Email Sent"
            })
    })
})

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
    // UserInfo.findOne({token:req.body.token})
    // .then((response)=>{
    //     token=response.token;
    //     //console.log(token);

    //     const verification_result=jwt.verify(token,'hdgbwsjd6reset#@$%^!*pass^%word56xw75xw867$%%$%^To$#ken&%^&');

    //     if(!verification_result){
    //        return res.json({
    //             message:"Token Expires"
    //         })
    //     }

    //     //console.log('verification_result',verification_result);
    //     username=verification_result.userid;
    //     //console.log("Token Username",username);
    //     UserInfo.update({username:username},{$set:{verified:true}})
    //     .then((result)=>{
    //        // console.log(result);
    //     })
    //    // console.log("Token Status",response);
    // })
    })
module.exports=route;