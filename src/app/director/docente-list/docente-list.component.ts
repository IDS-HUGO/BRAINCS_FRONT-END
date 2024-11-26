// docente-list.component.ts

import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../Service/docente.service';
import { UsuarioService } from '../Service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-docente-list',
  templateUrl: './docente-list.component.html',
  styleUrls: ['./docente-list.component.css']
})
export class DocenteListComponent implements OnInit {
  docentes: any[] = [];
  docenteImages: { [usuario: string]: string } = {}; // Almacena la imagen por docente
  apiBaseUrl = 'https://apibrainiacs.brainiacs.site';  // URL base para imágenes

  constructor(
    private docenteService: DocenteService,
    private usuarioService: UsuarioService // Servicio para obtener las imágenes
  ) {}

  ngOnInit() {
    this.getDocentes();
  }

  // Obtener la lista de docentes
  getDocentes() {
    this.docenteService.getDocentes().subscribe((response: any) => {
      this.docentes = response;
      this.docentes.forEach((docente) => {
        if (docente.usuario) {
          this.getUsuarioImage(docente.usuario);
        }
      });
    });
  }
  getUsuarioImage(usuario: string) {
    if (!usuario) {
      console.error('Usuario no disponible');
      return;
    }
  
    this.usuarioService.getImagenUsuario(usuario).subscribe(
      (response: any[]) => {
        if (response.length > 0 && response[0].file_path) {

          let relativePath = response[0].file_path.split('/static/')[1]; 

          if (relativePath) {

            let imagenUrl = `${this.apiBaseUrl}/static/${relativePath}`;
            this.docenteImages[usuario] = imagenUrl;
          } else {
            console.error('La ruta de la imagen no es válida');
            this.docenteImages[usuario] = '';  
          }
        } else {
          console.log('No hay imagen para el usuario');
          this.docenteImages[usuario] = '';  
        }
      },
      (error) => {
        console.error('Error al obtener la imagen:', error);
        this.docenteImages[usuario] = '';  
      }
    );
  }


  deleteDocente(id: number, event: Event) {
    event.stopPropagation();
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al docente permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.docenteService.deleteDocente(id).subscribe(() => {
          Swal.fire('Eliminado', 'El docente ha sido eliminado con éxito.', 'success');
          this.getDocentes();
        });
      }
    });
  }

  viewGroups(idDocente: number) {
    console.log(`Ver grupos para el docente con ID: ${idDocente}`);
  }
}
