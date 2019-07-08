import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-signup-model',
  templateUrl: './login-signup-model.component.html',
  styleUrls: ['./login-signup-model.component.css']
})
export class LoginSignupModelComponent implements OnInit {

  constructor(public userdetail:AuthService) { }

  signupdetail:FormGroup;
  logindetail:FormGroup;
  cpass:false;
  submited:boolean=false;//this is to check that user has click on login_submit button
  loginsubmited:boolean=false;//this is to check that user has click on signup_submit button
  ngOnInit() {

    this.signupdetail=new FormGroup({
      name:new FormControl(null,{validators:[Validators.required]}),
      email:new FormControl(null,{validators:[Validators.required,Validators.email]}),
      username:new FormControl(null,{validators:[Validators.required]}),
      gender:new FormControl(null,{validators:[Validators.required]}),
      password:new FormControl(null,{validators:[Validators.required]}),
      confirmpassword:new FormControl(null,{validators:[Validators.required]}),
    });

    this.logindetail=new FormGroup({
      username:new FormControl(null,{validators:[Validators.required]}),
      password:new FormControl(null,{validators:[Validators.required]})
    });
  }

  login(){
    this.loginsubmited=true;
    if(this.logindetail.invalid){
       return;
     }
    console.log(this.logindetail.value)
    this.userdetail.login(this.logindetail.value);
    
  }

  forgotpassword(){
    if(this.logindetail.value.username ==''){
      return alert("Please Enter Username to Reset Password")
    }

    else{
      console.log(this.logindetail.value.username)

    this.userdetail.resetpassword(this.logindetail.value.username)
    }
  }

  signUp(){
    this.submited=true;
    if(this.signupdetail.value.confirmpassword!=this.signupdetail.value.password)
    {
      alert('Password Does not match');
      return;
    }
    if(this.signupdetail.invalid){
     // alert(this.signupdetail.get('name').invalid);
      return;
    }

    console.log(this.signupdetail.value);
    this.userdetail.register(this.signupdetail.value);

  }

  google(){
    this.userdetail.googlelogin();
    console.log("goolle");
  }

  

}
