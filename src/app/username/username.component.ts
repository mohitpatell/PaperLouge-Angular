import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnInit {

  username:FormGroup;
  constructor(private router:ActivatedRoute, private auth:AuthService) { }

  ngOnInit() {
    this.username= new FormGroup({
      username:new FormControl(null,{validators:[Validators.required]})
    })
  }
  resetpassword(){

    if(this.username.invalid)
    {
      return;
    }
    this.auth.resetpassword(this.username.value.username);
    //console.log(this.resetpassdata.value);
  }

}
