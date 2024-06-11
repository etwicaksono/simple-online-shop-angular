import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  sidebarVisible: boolean = false
  isCustomerActive: boolean = false;
  isItemActive: boolean = false;
  isOrderActive: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.isCustomerActive = this.router.url.startsWith('/customer');
        this.isItemActive = this.router.url.startsWith('/item');
        this.isOrderActive = this.router.url.startsWith('/order');
      }
    });
  }

}
