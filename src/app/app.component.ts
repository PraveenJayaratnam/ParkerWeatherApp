import { Component } from '@angular/core';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  closeMenu(menu: MatMenu): void {
    menu.closed.emit();
  }
}
