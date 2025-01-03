import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {RouterLink, RouterModule} from '@angular/router';
import {AuthenticationService} from '../../../authentication/service/authentication-service';
import {NgIf} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    RouterLink,
    RouterModule,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() title: string = 'MyApp';

  isLoggedIn: boolean = false;
  private authSubscription: Subscription | undefined;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authSubscription = this.authService.currentUser$.subscribe(
      (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      }
    );
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
