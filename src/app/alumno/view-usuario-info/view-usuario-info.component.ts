import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Alumno } from '../models/alumno';
import { AlumnoService } from '../services/alumno.service';


@Component({
  selector: 'app-view-usuario-info',
  templateUrl: './view-usuario-info.component.html',
  styleUrl: './view-usuario-info.component.css'
})
export class ViewUsuarioInfoComponent {
  @Input() matricula!: string;
  @Output() closeModalEvent = new EventEmitter<void>();

  usuario: Alumno = {
    matricula: "",
    nombre: "",
    apellido_p: "",
    apellido_m: "",
    correo_electronico: "",
    grado: 0,
    grupo: "",
    calif_total: 0
  };
  imagen: string | undefined;

  constructor(private alumnoService: AlumnoService){}

  ngOnInit() {
    const matricula = localStorage.getItem('usuario');

    if (matricula) {
      this.alumnoService.getAlumnoByMatricula(matricula).subscribe(data => {
        this.usuario = data;
      });

      this.alumnoService.getImagenUsuario(matricula).subscribe(data => {
        if (data.length > 0) {
          const relativePath = data[0].file_path.split('/static/')[1];
          this.imagen = `${this.alumnoService.apiBaseUrl}/static/${relativePath}`;
        }
      });
    } else {
      console.error('Usuario no encontrado en localStorage');
    }
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
}
