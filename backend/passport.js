const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GoogleDB=require('./model/googlelogin')

passport.use('google',new GoogleStrategy({

    clientID:'938031312532-1f0a63840v257fhn59i3jrk1735pmpmc.apps.googleusercontent.com',

    clientSecret:'TXqr_43TqdDrIyGoIfDpXOmi',

    callbackURL:"http://localhost:3000/auth/google/callback"

},async(accessToken,refreshToken,profile,done)=>{
    console.log('accessToken',accessToken);
    console.log('refreshToken',refreshToken);
    console.log('profile',profile);
    const userInfo=new GoogleDB({
        name:profile._json.name,
        email:profile._json.email,
 });
 userInfo.save()
 .then((response)=>{
     console.log("Final Data Added to database",response);
     return done(null,response);
 });
}));    