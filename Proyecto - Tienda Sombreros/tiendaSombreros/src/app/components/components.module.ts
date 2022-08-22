import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SeleccionesComponent } from './selecciones/selecciones.component';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { ShowcaseComponent } from './showcase/showcase.component';
import { FooterComponent } from './footer/footer.component'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../pipes/filter.pipe';
import { TiposPipe } from '../pipes/tipos.pipe';




@NgModule({
  declarations: [
    NavbarComponent,
    SeleccionesComponent,
    ShowcaseComponent,
    FooterComponent,
    FilterPipe,
    TiposPipe
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    RouterModule,
    MatInputModule,
    MatBadgeModule,
    MatTableModule,
    FormsModule,
  ],
  exports: [
    NavbarComponent,
    SeleccionesComponent,
    ShowcaseComponent,
    FooterComponent,
    FilterPipe,
    TiposPipe
  ]
})
export class ComponentsModule { }
