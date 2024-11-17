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

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.showHeader = this.router.url !== '/login';
      this.role = localStorage.getItem('role');
    });
  }

  openModal() {
    this.modalOpen = true;
  }
}