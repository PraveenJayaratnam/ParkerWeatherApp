/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private locationsData = new BehaviorSubject<any[]>([]);
  locationsData$ = this.locationsData.asObservable();

  setLocationsData(data: any[]): void {
    this.locationsData.next(data);
  }
}
