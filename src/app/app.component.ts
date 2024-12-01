import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showHeader: boolean = true;
  role: string | null = null;
  title = 'BRAINCS';
  modalOpen: boolean = false;
  currentRoute: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      const excludedRoutes = ['/', '/login']; // Rutas donde no quieres mostrar el header
      this.showHeader = !excludedRoutes.includes(this.router.url);
      this.role = localStorage.getItem('role');
      this.currentRoute = this.router.url;
    });
  }

  openModal() {
    this.modalOpen = true;
  }

  openProfileModal() {
    this.modalOpen = true;
  }
}