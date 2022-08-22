import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ComponentsModule } from '../components/components.module';
import { UsuarioComponent } from './usuario/usuario.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ProductoComponent } from './producto/producto.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    CarritoComponent,
    ProductoComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MatGridListModule,
    MatIconModule,  
    MatButtonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule
  ],
  exports: [
    HomeComponent,
    LoginComponent,
    CarritoComponent,
    UsuarioComponent,
    ProductoComponent
  ]
})
export class PagesModule { }
