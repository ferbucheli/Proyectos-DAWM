import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-selecciones',
  templateUrl: './selecciones.component.html',
  styleUrls: ['./selecciones.component.css']
})
export class SeleccionesComponent implements OnInit {

  @Output() cambioTipo = new EventEmitter<string>();
  
  tipo:string = ""

  tipos:string[] = ['Todos', 'Vaquero', 'Casual', 'Playero']

  faSearch = faSearch

  constructor() { }

  ngOnInit(): void {
  }

  seleccionarTipo(tipo:string){
    this.tipo = tipo;
    this.cambioTipo.emit(this.tipo);
  }


}
