import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListBooksService } from '../services/list-books.service';
import { Subscription } from 'rxjs';
import {Books} from '../services/books.model';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  mybooks:Books[]=[];
  bookcategory:string;
  books:Subscription;
   

  constructor(public route :ActivatedRoute,public listbooks:ListBooksService) { }

  ngOnInit() {
    let currentURL:string;

    this.route.params.subscribe(parameter=>{
      currentURL=parameter['name']
    })
    if(currentURL==='technology'){this.technology()}
    if(currentURL==='science'){this.science()}
    if(currentURL==='selfhelp'){this.selfhelp()}
    if(currentURL==='novel'){this.novel()}
    if(currentURL==='buisness'){this.buisness()}
    if(currentURL==='biographies'){this.biographies()}
  }

  technology(){
    this.route.params.subscribe(param=>{
      this.bookcategory=param['name']
    })
    this.listbooks.technology();
    this.books=this.listbooks.updatebooklist()
                    .subscribe((response)=>{
                      this.mybooks=response.books
                    })
  }
  
  biographies(){
    this.route.params.subscribe(param=>{
      this.bookcategory=param['name']
    })
    this.listbooks.biographies();
    this.books=this.listbooks.updatebooklist()
                   .subscribe((response)=>{
                      this.mybooks=response.books
                   })
  }
  science(){
    this.route.params.subscribe(param=>{
      this.bookcategory=param['name']
    })
    this.listbooks.science();
    this.books=this.listbooks.updatebooklist()
                   .subscribe((response)=>{
                      this.mybooks=response.books
                   })
  }

  novel(){
    this.route.params.subscribe(param=>{
      this.bookcategory=param['name']
    })
    this.listbooks.novel();
    this.books=this.listbooks.updatebooklist()
                   .subscribe((response)=>{
                      this.mybooks=response.books
                   })
  }

  buisness(){
    this.route.params.subscribe(param=>{
      this.bookcategory=param['name']
    })
    this.listbooks.buisness();
    this.books=this.listbooks.updatebooklist()
                   .subscribe((response)=>{
                      this.mybooks=response.books
                   })
  }

  selfhelp(){
    this.route.params.subscribe(param=>{
      this.bookcategory=param['name']
    })
    this.listbooks.selfhelp();
    this.books=this.listbooks.updatebooklist()
                   .subscribe((response)=>{
                      this.mybooks=response.books
                   })
  }




}
