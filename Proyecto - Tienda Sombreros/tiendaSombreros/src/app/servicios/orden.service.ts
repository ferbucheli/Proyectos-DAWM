import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orden } from '../interfaz/orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  constructor(private http: HttpClient) { }

  agregarOrden(orden: Orden) {
    return this.http.post('http://localhost:3000/ordenes', orden)
  }
}
