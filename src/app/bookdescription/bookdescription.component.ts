import { Component, OnInit } from '@angular/core';
import {BOOKS} from '../bookdetails';
import {book} from '../bookdetails';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDescriptionService } from '../services/book-description.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

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


}
