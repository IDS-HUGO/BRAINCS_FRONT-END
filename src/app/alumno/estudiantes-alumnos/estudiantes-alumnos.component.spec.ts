import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesAlumnosComponent } from './estudiantes-alumnos.component';

describe('EstudiantesAlumnosComponent', () => {
  let component: EstudiantesAlumnosComponent;
  let fixture: ComponentFixture<EstudiantesAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstudiantesAlumnosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudiantesAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
