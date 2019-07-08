import { Component, OnInit } from '@angular/core';
import {BOOKS} from '../bookdetails';
import {book} from '../bookdetails';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDescriptionService } from '../services/book-description.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({

  selector: 'app-bookdescription',
  templateUrl: './bookdescription.component.html',
  styleUrls: ['./bookdescription.component.css']
})
export class BookdescriptionComponent implements OnInit {

 
   mybooks:any;
   category:string;
   bookId:string;
   
   related:book[]=BOOKS;
   book:Subscription
   userCanDownload:boolean;
   downloadActive:Subscription

    constructor(private route:Router, private router:ActivatedRoute, private bookdesc:BookDescriptionService, private auth:AuthService) {

     }

  ngOnInit() {
// this is to enable the user to download the book 
    this.userCanDownload=this.auth.download;
   
    this.downloadActive=this.auth.userAuthListener()
    .subscribe((response)=>{
      console.log("REsponse",response.status)
      this.userCanDownload=response.status
    })

    this.router.params.subscribe((parameter)=>{
      this.category=parameter['category'];
      this.bookId=parameter['bookid'];
    })

    this.bookdesc.bookDescription(this.category,this.bookId);

    this.book=this.bookdesc.bookDetailListener()
                  .subscribe((response)=>{
                    this.mybooks=response.bookdescription
                    console.log(this.mybooks)
                  })

                 
  }

  download(){
    alert("Please LogIn to Download The E-Books")
  }

  addDownload(){
    console.log("hit")
    this.bookdesc.addbooktodownload();
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
