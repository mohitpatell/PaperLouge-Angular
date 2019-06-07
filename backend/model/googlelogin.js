const mongoose =require('mongoose');

const googledb=mongoose.Schema({
    name:{type:String},
    email:{type:String}
})

module.exports=mongoose.model("GoogleDB",googledb);