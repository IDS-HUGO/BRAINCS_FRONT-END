import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  rol: string | null = null;

  ngOnInit() {
    this.rol = localStorage.getItem('role');
    console.log('Rol cargado desde localStorage:', this.rol);
  }
  
}