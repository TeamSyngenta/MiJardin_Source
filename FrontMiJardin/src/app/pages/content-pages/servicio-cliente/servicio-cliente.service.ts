import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appUrl } from '../../../Constantes/app.constantes'
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})



export class ServicioClienteService {

    constructor(private http: HttpClient) { }

    getObtenerNotasContables(idRazon): Observable<any> {
        return this.http.get(environment.APROBACIONRURL + '/ObtenerNotasContables?idRazon=' + idRazon);
    }
    setActualizarSapNotaContable(idNotaContable, codSap): Observable<any> {
        return this.http.get(environment.APROBACIONRURL + '/ActualizarSapNotaContable?idNotaContable=' + idNotaContable + '&codSap=' + codSap);
    }

} 


