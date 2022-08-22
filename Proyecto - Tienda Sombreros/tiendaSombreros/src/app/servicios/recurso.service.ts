import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  constructor(private http: HttpClient) { }

  obtenerProductoPorId(id: number) {
    return this.http.get('http://localhost:3000/productos/'+id.toString())
  }

  obtenerProductos() {
    return this.http.get('http://localhost:3000/productos')
  }
}
