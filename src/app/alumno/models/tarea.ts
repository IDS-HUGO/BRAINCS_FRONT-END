export interface Tarea {
    id_tarea?: number; // Ahora es opcional
    id_actividad: number;
    id_alumno: string;
    tarea: string;
    file?: File;
  }
  