import { nuevoProducto } from "./nuevoProducto";
import { archivoAdjunto } from "./archivoAdjunto";
import { notaContable } from './notaContable';

export class notaContableRecall {

    notaContable: notaContable;
    listaFicheros: Array<archivoAdjunto>;
    listaProductos: Array<nuevoProducto>;
    
}
