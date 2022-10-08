import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductocarroService {

  constructor(private http: HttpClient) { }

  agregarProducto(producto:any){
    return this.http.post('http://localhost:3000/productoscarro', producto)
  }
}
