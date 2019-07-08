import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ListBooksService } from '../services/list-books.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  isUserLoggedIn:Subscription;

  logged:boolean=false;
  constructor(public listbooks:ListBooksService, public auth:AuthService) { }

  ngOnInit() {

        this.isUserLoggedIn=this.auth.userAuthListener()
        .subscribe((response)=>{
          this.logged= response.status
        })
  }

}
