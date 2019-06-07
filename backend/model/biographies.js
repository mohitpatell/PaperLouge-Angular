const mongoose=require('mongoose');

const biographiesSchema =mongoose.Schema({
    bookName:{type:String, required:true},
    bookAuthor:{type:String, required:true},
    image:{type:String, required:true},
    content:{type:String, required: true},
    category:{type:String, required:true},
    price:{type:Number, required:true},
    rating:{type:Number, required:true},
    tag:{type:String},
    PDF:{type:String,required:true},
});

module.exports=mongoose.model('Biographies',biographiesSchema);