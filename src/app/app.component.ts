import {Component} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from './core/components/navbar/navbar.component';
import {NgIf} from '@angular/common';
import {filter} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pizzeria-frontend';

  showNavbar: boolean = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showNavbar = ![
          "/placeholder"
          // '/auth/login',
          // '/auth/logout'
        ].includes(event.url);
      });
  }

}
