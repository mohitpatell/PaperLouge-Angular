import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
    providedIn:"root"
})

export class AuthService{

    token:string;
    public isLoggedIn:boolean=false;
    public authListener=new Subject <{status:boolean}>();
    public download:boolean=false;

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
            gender: details.gender,
            password:details.password
        })
        this.http.post<{message:string}>('http://localhost:3000/signup',data)
                 .subscribe((response)=>{
                     alert(response.message);
                 })
                 
    }

    checkLocalStorage(){
        const token=localStorage.getItem('paperlougetoken')
        console.log("localcheck")
        if(!token){
            return;
        }
        console.log("localcheckpass")
        this.isLoggedIn=true;
        this.download=true;
        this.authListener.next({
            status:this.isLoggedIn
        })
        console.log("looged",this.isLoggedIn)
        this.token=token;
    }

    login(logindetail:any){
        const details={
            username:logindetail.username,
            password:logindetail.password
        }

        this.http.post<{message:string, token:string}>('http://localhost:3000/login',details)
                .subscribe((response)=>{
                    this.token=response.token;
                    if(this.token){
                    this.setLocalStorageItem(this.token);
                    this.download=true;
                    this.isLoggedIn=true;
                    this.authListener.next({
                        status: this.isLoggedIn
                    })
                }
                    console.log(response)
                    alert(response.message)
                })
    }
    logout(){
        this.token=null;
        this.download=false;
        this.isLoggedIn=false;
        this.removeLocalStorageItem();
        this.authListener.next({
            status:this.isLoggedIn
        })
    }

    setLocalStorageItem(token:string){
        localStorage.setItem('paperlougetoken',token);
    }

    removeLocalStorageItem(){
        localStorage.removeItem('paperlougetoken');
    }

    userAuthListener(){
        return this.authListener.asObservable();
    }

    resetpassword(user:string){
        const username={
            username:user
        };

        this.http.post<{message:string}>('https://sheltered-forest-96439.herokuapp.com/resetpassword',username)
                .subscribe((response=>{
                    console.log(response);
                    alert(response.message+"to your registered mail");
                }))
    }

    resetpasstoken(token:string, password:string){
            const posttoken={
                token:token,
                password:password
            }
            this.http.post<{message:string}>('https://sheltered-forest-96439.herokuapp.com/reset',posttoken)
            .subscribe((response)=>{
                alert(response.message)
                console.log(response)
            })
    }

googlelogin(){
    this.http.get<{}>('https://sheltered-forest-96439.herokuapp.com/auth/google')
    .subscribe((response)=>{
        console.log(response)
    })
}

//Stripe Payment

    payment(token){
        this.http.post<{msg:string}>('https://sheltered-forest-96439.herokuapp.com/pay',token)
        .subscribe(response=>{
            alert(response.msg);
        })
    }

}