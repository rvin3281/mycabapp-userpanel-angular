import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TravelServiceService {
  apiEndpointURL: string = 'http://localhost:8083/api/v1/booking';
  apiEndpointURLTravel: string = 'http://localhost:8082/api/v1/travel';
  apiEndpoint: string = 'https://jian.sh/malaysia-api/state/v1/all.json';

  private travelSource = new BehaviorSubject<string>('');
  private travelDestination = new BehaviorSubject<string>('');
  private availableTravel = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  // State management for routing
  setTravelSource(source: string) {
    this.travelSource.next(source);
  }

  setTravelDestination(destination: string) {
    this.travelDestination.next(destination);
  }

  setAvailableTravel(travel: any[]) {
    this.availableTravel.next(travel);
  }

  getTravelSource(): Observable<string> {
    return this.travelSource.asObservable();
  }

  getTravelDestination(): Observable<string> {
    return this.travelDestination.asObservable();
  }

  getAvailableTravel(): Observable<any[]> {
    return this.availableTravel.asObservable();
  }

  getAllState() {
    return this.http.get(this.apiEndpoint);
  }

  getTravelById(id: Number) {
    return this.http.get(`${this.apiEndpointURLTravel}/${id}`);
  }

  checkAvailable(source: string, destination: string) {
    console.log(`Checking availability for ${source} to ${destination}`);
    // Create an instance of HttpParams
    const params = new HttpParams()
      .set('source', source) // Replace 'param1' with your actual parameter name
      .set('destination', destination); // Replace 'param2' with your actual parameter name

    console.log(params);

    // Pass the HttpParams instance to the get request
    return this.http.get(`${this.apiEndpointURL}/checkAvailable`, { params });
  }

  bookTravel(obj: any) {
    return this.http.post(`${this.apiEndpointURL}/booktravel`, obj);
  }

  getBookingById(id: any) {
    return this.http.get(`${this.apiEndpointURL}/${id}`);
  }
}
