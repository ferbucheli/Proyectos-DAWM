import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  products : any = [];
  public grandTotal !: string;

  constructor(private carritoService: CarritoService) { }

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
}
