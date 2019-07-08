const express= require('express');
const path =require('path');
const app=express();

app.use(express.static(__dirname+'/dist/PaperLouge'));
app.get('*',(req,res)=>{
  res.sendFiles(path.join(__dirname+'/dist/PaperLouge/index.html/'));
});

app.listen(process.env.PORT || 8000);