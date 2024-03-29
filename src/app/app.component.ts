import { Component, OnDestroy, OnInit } from '@angular/core';
import { TravelServiceService } from './services/travel-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  title = 'mycabapp-user';

  availableState: any[] = [];

  source: string;
  destination: string;

  availableTravel: any[] = [];

  constructor(private travelService: TravelServiceService) {}

  cancel() {
    this.availableTravel = [];
    this.source = '';
    this.destination = '';
  }

  checkAvailability() {
    this.availableTravel = []; // Clear existing data

    const checkAvailabilitySubscription = this.travelService
      .checkAvailable(this.source, this.destination)
      .subscribe({
        next: (res: any) => {
          if (res.data.length > 0) {
            this.availableTravel = res.data;
          }
          console.log(this.availableTravel);
        },
        error: (error: any) => {},
        complete: () => {},
      });

    this.subscription.add(checkAvailabilitySubscription);
  }

  getAllState() {
    const getAllStateSubscription = this.travelService.getAllState().subscribe({
      next: (res: any) => {
        if (res.length > 0) {
          this.availableState = res.map((item: any) => ({
            state: item.state,
          }));
        } else {
          this.availableState = [];
        }
      },
      error: (error: any) => {},
    });
    this.subscription.add(getAllStateSubscription);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.getAllState();
  }
}
