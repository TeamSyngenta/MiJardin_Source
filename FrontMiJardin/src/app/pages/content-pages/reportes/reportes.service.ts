import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})



export class ReportesService {

    constructor(private http: HttpClient) { }

    getObtenerEstados(): Observable<any> {
        return this.http.get(environment.REPORTESURL + '/ObtenerEstadoNotasReportes');
    }
    getConsultarDatosReporte(datosBusqueda): Observable<any> {
        return this.http.post(environment.REPORTESURL + '/ConsultarNotasReportes', datosBusqueda);
    }


}


