import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookingData } from 'src/app/DTOs/BookingResponseData.model';
import { TravelServiceService } from 'src/app/services/travel-service.service';

@Component({
  selector: 'app-payment-travel',
  templateUrl: './payment-travel.component.html',
  styleUrls: ['./payment-travel.component.css'],
})
export class PaymentTravelComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  private subscription = new Subscription();

  bookingId: Number;

  bookingData: BookingData = {
    bookingId: 0,
    status: 0,
    travelDate: '',
    travelDays: '',
    travelDestination: '',
    travelPerDayCost: '',
    travelSource: '',
    travelTotalCost: 0,
    travel_time: '',
  };

  constructor(
    private activateRoute: ActivatedRoute,
    private travelService: TravelServiceService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.activateRoute.params.subscribe((params) => {
        this.bookingId = +params['id'];
      })
    );

    this.loadBookingTravelById(this.bookingId);
  }

  loadBookingTravelById(id: Number) {
    const getBookingTravelSubscription = this.travelService
      .getBookingById(id)
      .subscribe({
        next: (res: any) => {
          if (res && res.data) {
            this.bookingData.bookingId = res.data.bookingId;
            this.bookingData.status = res.data.status;
            this.bookingData.travelDate = res.data.travelDate;
            this.bookingData.travelDays = res.data.travelDays;
            this.bookingData.travelDestination = res.data.travelDestination;
            this.bookingData.travelSource = res.data.travelSource;
            this.bookingData.travelPerDayCost = res.data.travelPerDayCost;
            this.bookingData.travelTotalCost = res.data.travelTotalCost;
            this.bookingData.travel_time = res.data.travel_time;
          }
        },
        error: (error: any) => {},
        complete: () => {},
      });

    this.subscription.add(getBookingTravelSubscription);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
