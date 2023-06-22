/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  currentWeather(location: string): Observable<any> {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=3da02ff7c3024565964190500231006&q=${location}&aqi=no`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.get<any[]>(apiUrl);
  }

  forcastWeather(location: string): Observable<any> {
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=3da02ff7c3024565964190500231006&q=${location}&days=3&aqi=no&alerts=no`;
    return this.http.get<any[]>(apiUrl);
  }

  searchLocations(query: string): Observable<any[]> {
    const apiUrl = `https://api.weatherapi.com/v1/search.json?key=3da02ff7c3024565964190500231006&q=${query}`;
    return this.http.get<any[]>(apiUrl).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map((response) =>
        response.map((item) => ({ name: item.name, id: item.id }))
      )
    );
  }
}
