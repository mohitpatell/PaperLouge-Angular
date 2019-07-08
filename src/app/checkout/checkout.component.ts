import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, Validators } from "@angular/forms";
 
import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "ngx-stripe";
import { AuthService } from '../services/auth.service';
 


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  cardOptions: ElementOptions = {
      style: {
        base: {
          iconColor: '#666EE8',
          color: '#31325F',
          lineHeight: '40px',
          fontWeight: 300,
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSize: '16px',
          '::placeholder': {
            color: '#212529'
          }
        }
      }
    };
   
    elementsOptions: ElementsOptions = {
      locale: 'es'
    };
   
    stripeTest: FormGroup;
   
    constructor(
      private fb: FormBuilder,
      private stripeService: StripeService,
      private auth:AuthService) {}
   
    ngOnInit() {
      this.stripeTest = new FormGroup({
        email: new FormControl(null,{validators:[Validators.required]}),
        name: new FormControl(null,{validators:[Validators.required]}),
        amount: new FormControl(null,{validators:[Validators.required]}),
      })
    }
   
    buy() {
      const name = this.stripeTest.get('name').value;
      const email = this.stripeTest.get('email').value;
      const amount = this.stripeTest.get('amount').value;
      const ownerInfo = {
        owner: {
          name: name,
          email: email
        },
      };
      this.stripeService
        .createSource(this.card.getCard(),ownerInfo)
        .subscribe(result => {
          console.log(result);
          if (result) {
            console.log(result.source.id);
            // const obj = {
            //   token: result.token.id,
            //   email: this.stripeTest.get('email').value,
            //   user: this.stripeTest.get('name').value,
            //   amount: 100,
            //   product: "Dummy Product",
            //   description: "This Payment is for test",
            //   order_id:7879482371,
            //   id:111
            // }
                      const obj = {
              token: result.source.id,
              email: this.stripeTest.get('email').value,
              amount:  this.stripeTest.get('amount').value
            }
            // Use the token to create a charge or a customer
            this.auth.payment(obj);
            // https://stripe.com/docs/charges
          } else if (result.error) {
            // Error creating the token
            console.log(result.error.message);
          }
        });
    }

  
}

