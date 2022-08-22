import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultProducto = [];
    for(let producto of value){
      let modelo = producto.modelo.toLowerCase( )
      if(modelo.indexOf(arg.toLowerCase()) > -1){
        resultProducto.push(producto)
      }
    }
    return resultProducto;
  }

}
