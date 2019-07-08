const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GoogleDB=require('./model/googlelogin')
var  FacebookStrategy = require('passport-facebook').Strategy;


//serialize will call when u write a cookie
passport.serializeUser((user,done)=>{
    console.log("serializeUser Calls")
    var error = null;
    done(error,user);
});
//to read a token no. form a cookie
//this will call when u read a data from cookie same as above
passport.deserializeUser((userid,done)=>{
    console.log("deserializeUser Calls")
    console.log('user session', userid);
    //added after
    User.findById(userid).then(user=>{
        done(null,user);
    })
})

// FacebookStrategy for login with facebook 
passport.use(new FacebookStrategy({
    clientID: 459331131489822,
    clientSecret: "f6aa2cd1352ea78df8604cb0ec770b00",
    callbackURL: "https://sheltered-forest-96439.herokuapp.com/auth/facebook/callback"
  },
  async(accessToken,refreshToken,profile,done)=> {
    console.log('accessToken',accessToken);
    console.log('refreshToken',refreshToken);
    console.log('profile got',profile);
    // done(null, profile);
    return done(null,profile);
  }
));

// GoogleStrategy for login with google

passport.use('google',new GoogleStrategy({

    clientID:'1009742627126-or2g95n9r715nl27pubqd5vbn56cbns8.apps.googleusercontent.com',

    clientSecret:'8Z_aqBDq16VpOUM3U5z-YvHs',

    callbackURL:"http://localhost:3000/auth/google/callback"

},async(accessToken,refreshToken,profile,done)=>{
    let getresponse;
    console.log('accessToken',accessToken);
    console.log('refreshToken',refreshToken);
    console.log('profile',profile);
    const userInfo=new GoogleDB({
        name:profile._json.name,
        email:profile._json.email,
 });
 GoogleDB.findOne({email:profile._json.email})
 .then((response)=>{
    getresponse=response
    if(response) return done(null,response);
   
 })
 if(getresponse==null)
{ userInfo.save()
 .then((response)=>{
     console.log("Final Data Added to database",response);
     return done(null,response);
 });}
}));    