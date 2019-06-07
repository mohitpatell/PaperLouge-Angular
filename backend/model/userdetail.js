const mongoose= require('mongoose');
const validator=require('mongoose-unique-validator');

const newuser=mongoose.Schema({
    name:{type:String, required:true},
    username:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    verified:{type:Boolean},
    token:{type:String, required:true},
})

newuser.plugin(validator);
module.exports=mongoose.model('UserInfo', newuser);