import { Component, OnInit } from '@angular/core';
import { RecursoService } from 'src/app/servicios/recurso.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/interfaz/producto';
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  item : Producto = {
    id: -1,
    descripcion: "",
    cantidad: 0,
    modelo:"",
    precio: 0,
    carrito: 0
  };

  constructor(private recursoService: RecursoService, private activatedRoute: ActivatedRoute, private carritoService: CarritoService) {}
  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.params;
    let id = params["id"]
    this.recursoService.obtenerProductoPorId(id).subscribe(respuesta => {
      this.item = respuesta as Producto
    })
  }

  addtoCart(item: Producto){
    this.carritoService.addtoCart(item);
  }
}


