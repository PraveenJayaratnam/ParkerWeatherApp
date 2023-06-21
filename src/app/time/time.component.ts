import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
})
export class TimeComponent implements OnInit {
  hr = '';
  min = '';
  sec = '';
  ampm = '';

  ngOnInit(): void {
    setInterval(() => {
      this.updateTime();
    }, 50);
  }

  updateTime(): void {
    const currentDate = new Date();
    let hr = currentDate.getHours();
    const min = currentDate.getMinutes();
    const sec = currentDate.getSeconds();

    if (hr > 12) {
      this.ampm = 'PM';
      hr = hr - 12;
    } else {
      this.ampm = 'AM';
    }

    this.hr = this.padZero(hr);
    this.min = this.padZero(min);
    this.sec = this.padZero(sec);
  }

  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
