import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetpassdata:FormGroup
  token:string;
  constructor(private router:ActivatedRoute, private auth:AuthService) { }

  ngOnInit() {
    this.resetpassdata= new FormGroup({
      username:new FormControl(null,{validators:[Validators.required]}),
      password:new FormControl(null,{validators:[Validators.required]}),
      conpassword:new FormControl(null,{validators:[Validators.required]}),
    })
  }
  resetpassword(){

    if(this.resetpassdata.value.conpassword!=this.resetpassdata.value.password)
    {
      alert('Password Does not match');
      return;
    }
    this.router.params.subscribe((args)=>{
      this.token=args['token']
    })
    console.log(this.token)
    this.auth.resetpasstoken(this.token, this.resetpassdata.value.password);
    //console.log(this.resetpassdata.value);
  }

}
