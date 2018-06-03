import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  navigateToGithub() {
    window.location.href = 'https://github.com/sherweb/ngx-materialize';
  }
}
