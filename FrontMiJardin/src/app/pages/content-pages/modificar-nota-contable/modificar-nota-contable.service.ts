import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ActualizarNotaContable } from '../../../interfaces/ActualizarNotaContable';
import { nuevoProducto } from '../../../interfaces/nuevoProducto';

@Injectable({
  providedIn: 'root'
})
export class ModificarNotaContableService {

    constructor(private http: HttpClient) { }

    getDatosNotaContableRecall(idNotaContable: string): Observable<any> {
        return this.http.get(environment.MODIFICARURL + '/ObtenerDatosNCRecall?idNc=' + idNotaContable);
    }
    ActNotaContable(actNota: ActualizarNotaContable): any {
        debugger;
        return this.http.post(environment.MODIFICARURL + '/ActualizarNotaContable', actNota);
    }
}
