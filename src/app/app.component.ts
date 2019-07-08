import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private auth:AuthService) { }
  isUserLoggedIn:Subscription;

  ngOnInit() {
    this.auth.checkLocalStorage();
    console.log("hit")
    this.isUserLoggedIn=this.auth.userAuthListener()
                            .subscribe((response)=>{
                              console.log("appnavcheck",response.status)
                              //this.logged= response.status
                            })
    
     
  }

}
