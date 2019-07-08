import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(public userdetail:AuthService) { }

  public contact;
  ngOnInit() {
    this.contact=new FormGroup({
      fname:new FormControl(null,{validators:[Validators.required]}),
      lname:new FormControl(null,{validators:[Validators.required]}),
      email:new FormControl(null,{validators:[Validators.required,Validators.email]}),
      contact:new FormControl(null,{validators:[Validators.required]}),
      message:new FormControl(null,{validators:[Validators.required]})
    });
  }

  contactdetail(){
    if(this.contact.invalid){
      alert("Pleaze fill all the feild correctly");
      return;
    }

    this.userdetail.contact(this.contact.value);
  }

}
