import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookOrderDto } from 'src/app/DTOs/BookOrder.model';
import { TravelServiceService } from 'src/app/services/travel-service.service';

@Component({
  selector: 'app-book-travel',
  templateUrl: './book-travel.component.html',
  styleUrls: ['./book-travel.component.css'],
})
export class BookTravelComponent implements OnInit, OnDestroy {
  source: string = '';
  destination: string = '';
  availableTravel: any[] = [];
  private subscriptions = new Subscription();

  travelId: Number;

  travelByIdData: any = {
    travelSource: '',
    travelDestination: '',
    travelCost: '',
    travel_time: '',
    travelDate: '',
    cabName: '',
    driverName: '',
    selectedDays: '',
  };

  bookTravel: BookOrderDto = {
    travelId: 0,
    days: '',
  };

  isLoading: Boolean = false;
  bookingId: Number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private travelService: TravelServiceService,
    private router: Router
  ) {} // If you need to navigate) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.activatedRoute.params.subscribe((params) => {
        this.travelId = +params['id']; // The '+' operator converts the string to a number
      })
    );

    this.getById(this.travelId);
  }

  onSubmit() {
    if (
      this.travelByIdData.selectedDays == null ||
      this.travelByIdData.selectedDays == ''
    ) {
      alert('Please Choose Days');
      return;
    }

    this.bookTravel.travelId = this.travelId;
    this.bookTravel.days = this.travelByIdData.selectedDays;

    this.confirmBooking();
  }

  confirmBooking() {
    this.isLoading = true;
    const bookTravelSubscription = this.travelService
      .bookTravel(this.bookTravel)
      .subscribe({
        next: (res: any) => {
          if (res.data != null) {
            this.bookingId = res.data.bookingId;

            this.router.navigate(['/payment', this.bookingId]);
          }
        },
        error: (error: any) => {
          alert(error);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    this.subscriptions.add(bookTravelSubscription);
  }

  getById(id: Number) {
    const getByIdTravelSubscription = this.travelService
      .getTravelById(id)
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.travelByIdData.travelSource = res.data.travelSource;
            this.travelByIdData.travelDestination = res.data.travelDestination;
            this.travelByIdData.travelDate = res.data.travelDate;
            this.travelByIdData.travel_time = res.data.travel_time;
            this.travelByIdData.travelCost = res.data.travelCost;
            this.travelByIdData.cabName = res.data.cab.cabName;
            this.travelByIdData.driverName = res.data.driver.driverName;
            console.log(this.travelByIdData);
            console.log(res.data);
          }
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {},
      });
    this.subscriptions.add(getByIdTravelSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }
}
