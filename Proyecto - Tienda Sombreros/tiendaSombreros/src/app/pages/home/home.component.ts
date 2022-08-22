import { Component, OnInit } from '@angular/core';
import { RecursoService } from 'src/app/servicios/recurso.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataSource = [];

  constructor(private recursoService: RecursoService) { }

  ngOnInit(): void {
    this.recursoService.obtenerProductos().subscribe(respuesta => {
      this.dataSource = respuesta as any
    })
  }



}
