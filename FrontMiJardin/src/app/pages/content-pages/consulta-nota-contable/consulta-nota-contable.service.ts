import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appUrl } from '../../../Constantes/app.constantes'
import { environment } from '../../../../environments/environment';
import { consultaNotaContable } from '../../../interfaces/consultaNotaContable';
import { map } from 'rxjs/operators';
import { ActualizarNotaContable } from '../../../interfaces/ActualizarNotaContable';
import { nuevoProducto } from '../../../interfaces/nuevoProducto';

@Injectable({
    providedIn: 'root'
})



export class ConsultarNotaContableService {

    constructor(private http: HttpClient) { }

    getObtenerEstados(): Observable<any> {
        return this.http.get(environment.REPORTESURL + '/ObtenerEstadoNotas');
    }
    ConsultarNotas(datosBusqueda): any {
        return this.http.post(environment.REPORTESURL + '/ConsultarNotas', datosBusqueda);
    }

    getObtenerProductos(paramBusqueda: string, tipoBusqueda: boolean, idUnidadComercial: number): Observable<any> {
        
        return this.http.get(environment.REPORTESURL + '/ObtenerProductos?descripcionProducto=' + paramBusqueda + '&parametroBusqueda=' + tipoBusqueda + '&idUnidadComercial=' + idUnidadComercial);
    }

    getObtenerDetallesNotas(request): Observable<any> {

        return this.http.get(environment.REPORTESURL + '/ObtenerDetallesNotas?idnotaContable=' + request);
    }

    getObtenerAdjuntosNota(request): Observable<any> {

        return this.http.get(environment.REPORTESURL + '/ObtenerAdjuntosNota?idnotaContable=' + request);
    }

    getObtenerProductosNota(request): Observable<any> {

        return this.http.get(environment.REPORTESURL + '/ObtenerProductosNota?idnotaContable=' + request);
    }

    

    DownloadFile(filePath: string, fileType: string): Observable<any> {

        let fileExtension = fileType;
        let input = filePath;

        return this.http.get(environment.REPORTESURL + "/DownloadFile?fileName=" + input, {
            responseType: 'blob',
            observe: 'response'
        })
            .pipe(
                map((res: any) => {
                    return new Blob([res.body], { type: fileExtension });
                })
            );
    }

}


