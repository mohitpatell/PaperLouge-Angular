import { Component, OnInit } from '@angular/core';
import {BOOKS} from '../bookdetails';
import {book} from '../bookdetails';
import { Subscription } from 'rxjs';
import { ListBooksService } from '../services/list-books.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  mybooks:book[]=BOOKS

  panelOpenState = false;
  isUserLoggedIn:Subscription;

  logged:boolean;
  constructor(public listbooks:ListBooksService, public auth:AuthService) { }

  ngOnInit() {
this.logged=this.auth.isLoggedIn;
        this.isUserLoggedIn=this.auth.userAuthListener()
        .subscribe((response)=>{
          this.logged= response.status
        })
  }

 
}
