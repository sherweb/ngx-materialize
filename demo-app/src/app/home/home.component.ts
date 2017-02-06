import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  navigateToGibhub() {
    window.location.href = 'https://github.com/sherweb/ng2-materialize';
  }
}
