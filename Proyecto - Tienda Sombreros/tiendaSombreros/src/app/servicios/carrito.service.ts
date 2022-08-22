import { Injectable } from '@angular/core';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../interfaz/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  public cartItemList : any = []
  public productList = new BehaviorSubject<any>([]);

  constructor() { }

  getProduct(){
    return this.productList.asObservable();
  }

  setProduct(product:any){
    this.cartItemList.push(product);
    this.productList.next(product);
  }

  addtoCart(product: any){
    // product.precio = Number(product.precio)
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice()
  }

  getTotalPrice(): number{
    let total:number = 0;
    this.cartItemList.map((a:Producto) => {
      total += Number(a.precio);
    })
    return total;
  }

  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id === a.id){
        this.cartItemList.splice(index,1)
      }
    })
    this.getTotalPrice()
  }

  removeAllItems(){
    this.cartItemList = []
    this.productList.next(this.cartItemList)
  }
}
