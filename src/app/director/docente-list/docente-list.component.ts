import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../Service/docente.service';
import { UsuarioService } from '../Service/usuario.service';
import { GrupoService } from '../Service/grupo.service';
import Swal from 'sweetalert2';
import { Grupo } from '../Models/grupo';

@Component({
  selector: 'app-docente-list',
  templateUrl: './docente-list.component.html',
  styleUrls: ['./docente-list.component.css']
})
export class DocenteListComponent implements OnInit {
  docentes: any[] = []; // Lista de docentes
  docenteImages: { [usuario: string]: string } = {}; // Imágenes de los docentes
  docenteGrupos: { [idDocente: number]: Grupo[] } = {}; // Grupos de los docentes
  selectedDocente: number | null = null; // Docente actualmente seleccionado

  constructor(
    private docenteService: DocenteService,
    private usuarioService: UsuarioService,
    private grupoService: GrupoService
  ) {}

  ngOnInit() {
    this.getDocentes();
  }

  // Obtener la lista de docentes
  getDocentes() {
    this.docenteService.getAllDocentes().subscribe((response: any) => {
      this.docentes = response;
      this.docentes.forEach((docente) => {
        if (docente.usuario) {
          this.getUsuarioImage(docente.usuario);
        }
      });
    });
  }

  // Obtener la imagen de un docente
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
            this.docenteImages[usuario] = `https://apibrainiacs.brainiacs.site/static/${relativePath}`;
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

  toggleGrupos(idDocente: number) {
    if (this.selectedDocente === idDocente) {
      this.selectedDocente = null; // Cierra el panel si ya está seleccionado
    } else {
      this.selectedDocente = idDocente;
      if (!this.docenteGrupos[idDocente]) {
        // Obtener los grupos del docente
        this.grupoService.getGruposByDocente(idDocente).subscribe((grupos) => {
          this.docenteGrupos[idDocente] = grupos;
          // Imprimir los grupos en consola
          console.log('Grupos del docente con ID:', idDocente, grupos);
        });
      }
    }
  }
  

  // Eliminar un docente
  deleteDocente(id: number, event: Event) {
    event.stopPropagation(); // Evita que se activen otros eventos
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
}
