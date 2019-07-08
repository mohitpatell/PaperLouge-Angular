import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {NgxStripeModule} from 'ngx-stripe';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { LoginSignupModelComponent } from './login-signup-model/login-signup-model.component';
import { CategoryComponent } from './category/category.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MybooksComponent } from './mybooks/mybooks.component';
import { CheckoutComponent } from './checkout/checkout.component';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatStepperModule} from '@angular/material/stepper';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { BookdescriptionComponent } from './bookdescription/bookdescription.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FooterComponent } from './footer/footer.component';
import { UsernameComponent } from './username/username.component';

import { ErrorInterceptor } from './interceptor/ErrorInterceptor';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    LoginSignupModelComponent,
    CategoryComponent,
    AboutComponent,
    ContactComponent,
    MybooksComponent,
    CheckoutComponent,
    ResetPasswordComponent,
    BookdescriptionComponent,
    AdminLoginComponent,
    FooterComponent,
    UsernameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule,
    MatTabsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatDividerModule,
    MatStepperModule,

    NgxStripeModule.forRoot('pk_test_ul5zqjTYvWdy5MhHAPaSVVsC00Ist42jOg')

  ],
  exports:[],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
