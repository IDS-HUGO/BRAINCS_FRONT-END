import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { AlumnoModule } from './alumno/alumno.module';
import { DocenteModule } from './docente/docente.module';
import { SharedModule } from "./shared/shared.module";
import { InicioComponent } from './inicio/inicio.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    AuthModule,
    DocenteModule,
    AlumnoModule,
    SharedModule,
    
],
  providers: [

    provideClientHydration()
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

