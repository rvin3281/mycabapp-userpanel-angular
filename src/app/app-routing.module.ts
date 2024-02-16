import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BookTravelComponent } from './Module/book-travel/book-travel.component';
import { HomeTravelComponent } from './Module/book-travel/home-travel/home-travel.component';
import { PaymentTravelComponent } from './Module/payment-travel/payment-travel.component';

const routes: Routes = [
  { path: '', component: HomeTravelComponent, pathMatch: 'full' },
  { path: 'book/:id', component: BookTravelComponent },
  { path: 'payment/:id', component: PaymentTravelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
