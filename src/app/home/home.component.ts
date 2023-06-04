import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  locationControl = new FormControl();
  locations: string[] = [];

  filteredLocations: Observable<string[]>;

  constructor() {
    this.filteredLocations = this.locationControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterLocations(value))
    );
  }

  private filterLocations(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.locations.filter((location) =>
      location.toLowerCase().includes(filterValue)
    );
  }

  searchLocation() {}

  detectLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}
