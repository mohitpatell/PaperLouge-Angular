import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor{

    constructor(private auth:AuthService){}

    intercept(req: HttpRequest<any>, next:HttpHandler){
        const authToken =this.auth.gettoken()

        const token = req.clone({
            headers: req.headers.set("Authorization", "Bearer "+ authToken)
        })

            return next.handle(token)
        
    }
}