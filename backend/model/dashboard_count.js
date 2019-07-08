const mongoose= require('mongoose');

const count=mongoose.Schema({
    user:{type:Number},
    books:{type:Number},
    downloads:{type:Number}
})

module.exports=mongoose.model("TotalCount",count);