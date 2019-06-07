import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
    providedIn:"root"
})

export class AuthService{

    token:string;
    private isLoggedIn:boolean=false;
    private authListener=new Subject <{status:boolean}>();

    constructor(private http:HttpClient){}

    gettoken(){
        return this.token;
    }

    register(details:any){
        console.log('Details',details);
        const data =({
            name: details.name,
            email:details.email,
            username: details.username,
            password:details.password
        })
        this.http.post<{message:string}>('http://localhost:3000/signup',data)
                 .subscribe((response)=>{
                     alert(response.message);
                 })
                 
    }

    login(logindetail:any){
        const details={
            username:logindetail.username,
            password:logindetail.password
        }

        this.http.post<{message:string, token:string}>('http://localhost:3000/login',details)
                .subscribe((response)=>{
                    this.token=response.token;
                    this.isLoggedIn=true;
                    this.authListener.next({
                        status: this.isLoggedIn
                    })
                    console.log(response)
                    alert(response.message)
                })
    }

    userAuthListener(){
        return this.authListener.asObservable();
    }

    resetpassword(user:string){
        const username={
            username:user
        };

        this.http.post<{message:string}>('http://localhost:3000/resetpassword',username)
                .subscribe((response=>{
                    console.log(response);
                }))
    }

    resetpasstoken(token:string, password:string){
            const posttoken={
                token:token,
                password:password
            }
            this.http.post<{message:string}>('http://localhost:3000/reset',posttoken)
            .subscribe((response)=>{
                alert(response.message)
                console.log(response)
            })
    }

googlelogin(){
    this.http.get<{}>('http://localhost:3000/auth/google')
    .subscribe((response)=>{
        console.log(response)
    })
}

}