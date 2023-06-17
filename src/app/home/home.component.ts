import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  locations: any[] = [];
  LocationControl: FormControl = new FormControl();
  @ViewChild('textEntered') textEntered!: ElementRef;
  subscriptions: Subscription[] = [];
  isLoading: boolean = false;
  selectedLocation: any;
  locationName: any;
  cloudCover: any;
  condition: any;
  weatherIcon: any;
  feelsLikeCelcius: any;
  feelsLikeFarenhite: any;
  humidity: any;
  lastUpdated: any;
  pressureInMilliBar: any;
  temperatureCelcius: any;
  temperatureFarenhite: any;
  uvIndex: any;
  visibiltyInKiloMeters: any;
  visibiltyInMiles: any;
  windDirection: any;
  windspeedkph: any;
  windspeedmiles: any;
  latitude: any;
  longitude: any;
  localtime: any;
  country: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {}

  getLocations() {
    const inputValue = this.textEntered.nativeElement.value;
    if (inputValue.length >= 1) {
      this.isLoading = true;
      const subscription = this.weatherService
        .searchLocations(inputValue)
        .subscribe(
          (response) => {
            this.locations = response;
            this.isLoading = false;
          },
          (error) => {
            console.error('Error loading locations');
            this.isLoading = false;
          }
        );
      this.subscriptions.push(subscription);
    }
  }

  setDefaultImage() {
    this.weatherIcon = '../../assets/draw2.webp';
  }

  getWeatherData(place: string) {
    const subscription = this.weatherService.currentWeather(place).subscribe(
      (weatherData: any) => {
        this.locationName = weatherData.location.name;
        this.cloudCover = weatherData.current.cloud;
        this.condition = weatherData.current.condition.text;
        this.weatherIcon = weatherData.current.condition.icon;
        this.feelsLikeCelcius = weatherData.current.feelslike_c;
        this.feelsLikeFarenhite = weatherData.current.feelslike_f;
        this.humidity = weatherData.current.humidity;
        this.lastUpdated = weatherData.current.last_updated;
        this.pressureInMilliBar = weatherData.current.pressure_mb;
        this.temperatureCelcius = weatherData.current.temp_c;
        this.temperatureFarenhite = weatherData.current.temp_f;
        this.uvIndex = weatherData.current.uv;
        this.visibiltyInKiloMeters = weatherData.current.vis_km;
        this.visibiltyInMiles = weatherData.current.vis_miles;
        this.windDirection = weatherData.current.wind_dir;
        this.windspeedkph = weatherData.current.wind_kph;
        this.windspeedmiles = weatherData.current.wind_mph;
        this.latitude = weatherData.location.lat;
        this.longitude = weatherData.location.lon;
        this.localtime = weatherData.location.localtime;
        this.country = weatherData.location.country;
      },
      (error: any) => {
        console.error('Error loading data');
      }
    );
    this.subscriptions.push(subscription);
  }

  getForcastData(place: string) {
    const subscription = this.weatherService.forcastWeather(place).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error('Error in loading Data');
      }
    );
    this.subscriptions.push(subscription);
  }

  assignValue(item: any) {
    this.selectedLocation = item.name as string;
    this.getWeatherData(this.selectedLocation);
    this.getForcastData(this.selectedLocation);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
