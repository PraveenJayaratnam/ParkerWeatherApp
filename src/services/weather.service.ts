import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  listWeather(location: string): Observable<any> {
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=3da02ff7c3024565964190500231006&q=${location}&aqi=no`;
    return this.http.get<any[]>(apiUrl);
  }

  searchLocations(query: string): Observable<any[]> {
    const apiUrl = `http://api.weatherapi.com/v1/search.json?key=3da02ff7c3024565964190500231006&q=${query}`;
    return this.http.get<any[]>(apiUrl).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map((response) =>
        response.map((item) => ({ name: item.name, id: item.id }))
      )
    );
  }
}
