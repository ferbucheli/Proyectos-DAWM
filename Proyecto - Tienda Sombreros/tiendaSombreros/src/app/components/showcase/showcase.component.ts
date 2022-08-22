import { Component, OnInit } from '@angular/core';
import { RecursoService } from 'src/app/servicios/recurso.service';
import { Producto } from 'src/app/interfaz/producto';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit {
  productos:any = [];

  filterProduct = '';
  tipo:string = 'Todos';

  constructor(private recursoService: RecursoService) { }

  ngOnInit(): void {
    this.recursoService.obtenerProductos().subscribe(respuesta => {
      this.productos = respuesta
    })
  }

}
