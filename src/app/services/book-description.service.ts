import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Books} from './books.model';
import { Subject } from 'rxjs';
@Injectable({
    providedIn:'root'
})
export class BookDescriptionService{

    private book:Books[]=[];
    private bookdetail=new Subject<{bookdescription:Books[]}>();

    constructor(private http:HttpClient){}

    bookDescription(category:string,id:string){

        const book={
            category:category,
            id:id
        }
       // console.log(" From Service",book)
        this.http.post<{message:string,book:any}>('http://localhost:3000/bookdescription',book)
                 .subscribe((response)=>{
                    //console.log("Response From Service",response)
                    this.book=response.book;
                    this.bookdetail.next({
                        bookdescription:this.book
                    })

                 })
    }

    bookDetailListener(){
        return this.bookdetail.asObservable();
    }
    
}