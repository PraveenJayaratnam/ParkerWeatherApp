import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  locations: any[] = [];
  LocationControl: FormControl = new FormControl();
  @ViewChild('textEntered') textEntered!: ElementRef;
  selectedLocation: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {}

  getLocations() {
    const inputValue = this.textEntered.nativeElement.value;
    if (inputValue.length >= 1) {
      this.weatherService.searchLocations(inputValue).subscribe((response) => {
        this.locations = response;
      });
    }
  }

  getWeatherData(place: string) {
    this.weatherService.listWeather(place).subscribe(
      (weatherData: any) => {
        console.log(weatherData);
      },
      (error: any) => {
        console.error('Error loading data');
      }
    );
  }

  assignValue(item: any) {
    this.selectedLocation = item.name as string;
    this.getWeatherData(this.selectedLocation);
  }
}
