import { nuevoProducto } from "./nuevoProducto";
import { archivoAdjunto } from "./archivoAdjunto";
import { notaContable } from './notaContable';



export class ActualizarNotaContable {
    idNotaContable: number;
    notaContable: notaContable;
    listaFicheros: Array<archivoAdjunto>;
    listaProductos: Array<nuevoProducto>;
    
}
