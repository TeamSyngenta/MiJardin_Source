import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { aprobacionNC } from '../../../interfaces/aprobacionNC';


@Injectable({
  providedIn: 'root'
})



export class AdministracionFlujoAprobacionService {

    constructor(private http: HttpClient) { }

    getObtenerEstados(): Observable<any> {
        return this.http.get(environment.REPORTESURL + '/ObtenerEstadoNotas');
    }
    getObtenerNotasAprobacion(request): Observable<any> {
        return this.http.get(environment.APROBACIONRURL + '/ObtenerNotasAprobacion?idUsuario=' + request);
    }
    setNuevaAprobacion(nuevaAprobacion: aprobacionNC): any {
        debugger;
        return this.http.post(environment.APROBACIONRURL + '/GuardarAprobacion', nuevaAprobacion);
    }
    getObtenerEstadisticas(request): Observable<any> {
        return this.http.get(environment.APROBACIONRURL + '/DatosEstadisticas?userName=' + request);
    }
  
  }




