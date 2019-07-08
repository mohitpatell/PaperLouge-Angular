import { Component, OnInit } from '@angular/core';
import {BOOKS} from '../bookdetails';
import {book} from '../bookdetails';
import { Subscription, Subject } from 'rxjs';
import { ListBooksService } from '../services/list-books.service';
import { AuthService } from '../services/auth.service';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  mybooks:book[]=BOOKS
  dashdetails:any;
  panelOpenState = false;
  isUserLoggedIn:Subscription;
  downloadedBOOKS:any;
  logged:boolean;

  constructor(public listbooks:ListBooksService, public auth:AuthService) { }

  ngOnInit() {
this.logged=this.auth.isLoggedIn;
        this.isUserLoggedIn=this.auth.userAuthListener()
        .subscribe((response)=>{
          this.logged= response.status
        })

        this.auth.dashboard()
        .subscribe(response=>{
         console.log("Dashboard Response",response);
         this.downloadedBOOKS=response.result[0].books;

      })
  }

  
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    margin: 30,
    stagePadding:25,
    nav:true,
    navText:["<img src='assets/icons/prev.png'>","<img src='/assets/icons/next.png'>"],
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      500: {
        items: 3,
        nav: true
      },
      600: {
        items: 3,
        nav: true
      },
      1000: {
        items: 4,
        nav: true,
        loop: false
      },
      1500: {
        items: 5,
        nav: true,
        loop: false
      }
    },
    
  }
}

 

