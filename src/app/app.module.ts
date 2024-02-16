import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookTravelComponent } from './Module/book-travel/book-travel.component';
import { HomeTravelComponent } from './Module/book-travel/home-travel/home-travel.component';
import { PaymentTravelComponent } from './Module/payment-travel/payment-travel.component';

@NgModule({
  declarations: [AppComponent, BookTravelComponent, HomeTravelComponent, PaymentTravelComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
