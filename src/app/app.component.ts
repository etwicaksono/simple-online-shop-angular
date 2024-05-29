import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const route = this.router.routerState.snapshot.root;
      this.setTitle(this.getDeepestTitle(route));
    });
  }

  setTitle(newTitle: string) {
    if (newTitle) {
      this.titleService.setTitle(newTitle);
    }
  }

  getDeepestTitle(route: any): string {
    let title = route.data.title;
    while (route.firstChild) {
      route = route.firstChild;
      if (route.data.title) {
        title = route.data.title;
      }
    }
    return title;
  }
}
