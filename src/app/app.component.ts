import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { Location, PopStateEvent } from "@angular/common";
import { Router, NavigationStart,NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor(private router: Router ,private auth:AuthService,private location: Location) { }
  isUserLoggedIn:Subscription;

  ngOnInit() {

    this.location.subscribe((ev:PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
  });
  this.router.events.subscribe((ev:any) => {
      if (ev instanceof NavigationStart) {
          if (ev.url != this.lastPoppedUrl)
              this.yScrollStack.push(window.scrollY);
      } else if (ev instanceof NavigationEnd) {
          if (ev.url == this.lastPoppedUrl) {
              this.lastPoppedUrl = undefined;
              window.scrollTo(0, this.yScrollStack.pop());
          } else
              window.scrollTo(0, 0);
      }
  });


    this.auth.checkLocalStorage();
    console.log("hit")
    this.isUserLoggedIn=this.auth.userAuthListener()
                            .subscribe((response)=>{
                              console.log("appnavcheck",response.status)
                              //this.logged= response.status
                            })
    
     
  }

}
