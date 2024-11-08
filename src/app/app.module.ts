import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';

//Alumnos
import { AlumnoModule } from './alumno/alumno.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

