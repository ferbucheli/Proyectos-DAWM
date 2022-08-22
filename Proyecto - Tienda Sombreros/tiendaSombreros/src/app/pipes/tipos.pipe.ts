import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipos'
})
export class TiposPipe implements PipeTransform {

  transform(value: any, tipo:string = ''): any{
    const resultProducto = [];
    for(let producto of value){
      if(producto.descripcion == tipo){
        resultProducto.push(producto)
      }
    }
    if(tipo == 'Todos')
      return value;
    else
      return resultProducto;
  }

}
