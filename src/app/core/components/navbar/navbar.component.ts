import {Component, Input, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {RouterLink, RouterModule} from '@angular/router';
import {AuthenticationService} from '../../../authentication/service/authentication-service';
import {NgIf} from '@angular/common';

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
export class NavbarComponent implements OnInit {
  @Input() title: string = 'MyApp';

  isLoggedIn: boolean = false;

  constructor(private authService: AuthenticationService) {
  }

  // TODO: Pizza list and register for viewers
  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

}
