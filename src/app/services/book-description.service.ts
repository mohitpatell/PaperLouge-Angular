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
        this.http.post<{message:string,book:any}>('https://sheltered-forest-96439.herokuapp.com/bookdescription',book)
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

    addbooktodownload(){
        console.log("service")
        this.http.get<{message:string}>('https://sheltered-forest-96439.herokuapp.com/bookdescription/downloaded')
        .subscribe((response)=>{
           console.log("Service Response",response.message)

        })
    }
    
}