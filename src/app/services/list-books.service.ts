import {HttpClient} from '@angular/common/http';
import {Books} from './books.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn:"root"
})
export class ListBooksService{

    private categorybooks:Books[]= [];

    private listbooks=new Subject<{books:Books[]}>();

    constructor(private http:HttpClient){}


    biographies(){
        this.http.get<{books:any}>('https://sheltered-forest-96439.herokuapp.com/list/biographies')
                 .subscribe((response)=>{
                    this.categorybooks=response.books
                    this.listbooks.next({
                        books:this.categorybooks
                        
                    })
                   // console.log(this.categorybooks)
                 })

    }

    novel(){
        this.http.get<{books:any}>('https://sheltered-forest-96439.herokuapp.com/list/novel')
                .subscribe((response)=>{
                    this.categorybooks=response.books
                    this.listbooks.next({
                        books:this.categorybooks
                    })
                })
    }

    science(){
        this.http.get<{books:any}>('https://sheltered-forest-96439.herokuapp.com/list/science')
        .subscribe((response)=>{
            this.categorybooks=response.books
            this.listbooks.next({
                books:this.categorybooks
            })
        })
    }

    buisness(){
        this.http.get<{books:any}>('https://sheltered-forest-96439.herokuapp.com/list/buisness')
        .subscribe((response)=>{
            this.categorybooks=response.books
            this.listbooks.next({
                books:this.categorybooks
            })
        })
    }

    selfhelp(){
        this.http.get<{books:any}>('https://sheltered-forest-96439.herokuapp.com/list/selfhelp')
        .subscribe((response)=>{
            this.categorybooks=response.books
            this.listbooks.next({
                books:this.categorybooks
            })
        })
    }

    technology(){
        this.http.get<{books:any}>('https://sheltered-forest-96439.herokuapp.com/list/technology')
        .subscribe((response)=>{
            this.categorybooks=response.books
            this.listbooks.next({
                books:this.categorybooks
            })
        })
    }

    updatebooklist(){
        return this.listbooks.asObservable();
    }

}