import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  
  months:String[];

  constructor() { }

  ngOnInit() {
    this.months=["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
  }

}

