import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TravelServiceService } from 'src/app/services/travel-service.service';

@Component({
  selector: 'app-home-travel',
  templateUrl: './home-travel.component.html',
  styleUrls: ['./home-travel.component.css'],
})
export class HomeTravelComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  title = 'mycabapp-user';

  availableState: any[] = [];

  source: string;
  destination: string;

  availableTravel: any[] = [];

  constructor(
    private travelService: TravelServiceService,
    private router: Router
  ) {}

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

  onBook(id: Number) {
    console.log(id);
    // Now you have the specific ID, you can use it to navigate or pass to another component
    // For example, using Router to navigate
    this.router.navigate(['/book', id]);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.getAllState();
  }
}
