import { Component, OnInit } from '@angular/core';
import { Orden } from 'src/app/interfaz/orden';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { OrdenService } from 'src/app/servicios/orden.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  products : any = [];
  public grandTotal !: string;
  orden: Orden = {
    id: -1,
    total: this.carritoService.getTotalPrice(),
    fecha: new Date(),
    id_cliente: 2
  }

  constructor(private carritoService: CarritoService, private ordenService: OrdenService) { }

  ngOnInit(): void {
    this.carritoService.getProduct()
    .subscribe(productos => {
      this.products = productos;
      let total = this.carritoService.getTotalPrice();
      this.grandTotal = total.toFixed(2)
    })
  }

  removeItem(item: any){
    this.carritoService.removeCartItem(item);
    let total = this.carritoService.getTotalPrice();
    this.grandTotal = total.toFixed(2)
  }

  emptyCart(){
    this.carritoService.removeAllItems();
  }

  realizarPedido() {
    console.log(this.orden)
    this.ordenService.agregarOrden(this.orden).subscribe()
  }
  
}
