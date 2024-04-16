import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//componentes
import { AgregarEditarClienteComponent } from './components/agregar-editar-cliente/agregar-editar-cliente.component';
import { ListadoClienteComponent } from './components/listado-cliente/listado-cliente.component';
import { VerClienteComponent } from './components/ver-cliente/ver-cliente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//modulos
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    AgregarEditarClienteComponent,
    ListadoClienteComponent,
    VerClienteComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
