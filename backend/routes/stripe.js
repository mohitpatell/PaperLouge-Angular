const router=require('express').Router();

const secretKey="sk_test_DG33K1lK5rF44nPyGzfqOBLG00qmWQp3Cw";
const publicKey="pk_test_ul5zqjTYvWdy5MhHAPaSVVsC00Ist42jOg";

const stripe=require('stripe')(secretKey);


//route for paying//
router.post('/pay',(req,res)=>{
    console.log(req.body);
    stripe.charges.create({//stripe.charge for creating a charge on user and stripe.customers for creating a new Customers 
      amount: req.body.amount,
      currency: 'usd',
      source: req.body.token
      }).then(response=>{
        res.json({msg:"Transaction Successfull"})
        // console.log("Transaction Successfull",res);
        // console.log("payment was successful")
      }).catch(err=> {
        // console.log("Error For Tranction",err)
        res.json({msg:"Your transaction failed..Try again after sometime",error:err});
      })
})
//route for paying ended


module.exports=router