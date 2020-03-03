import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appUrl } from '../../../Constantes/app.constantes'
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})



export class ServicioAdminAprobadoresService {

    constructor(private http: HttpClient) { }

    getObtenerConceptos(): Observable<any> {
        return this.http.get(environment.UTILITARIOSURL + '/ObtenerConceptos');
    }

    getObtenerNegocios(): Observable<any> {
        return this.http.get(environment.UTILITARIOSURL + '/ObtenerNegocios');
    }

    getObtenerUnidadesComerciales(): Observable<any> {
        return this.http.get(environment.UTILITARIOSURL + '/ObtenerUnidadesComerciales');
    }

    getObtenerMontosAprobadores(idConcepto): Observable<any> {
        
        return this.http.get(environment.UTILITARIOSURL + '/ObtenerMontosAprobadores?idConcepto=' + idConcepto);
    }

    getObtenerAprobadores(idConcepto, idUnidadComercial, idNegocio, idMonto): Observable<any> {

        return this.http.get(environment.UTILITARIOSURL + '/ObtenerAProbadores?idConcepto='+idConcepto+'&idUnidadComercial='+idUnidadComercial+'&idNegocio='+idNegocio+'&idMonto='+idMonto);
    }

    validarUsername(userName) {

        return this.http.get(environment.UTILITARIOSURL + '/ValidarUserName?userName='+userName);

    }

    ActualizarUserNameAprobacion(idFlujo,userName) {
        
        return this.http.get(environment.UTILITARIOSURL + '/ActualizarUserNameAprobacion?idFlujoAprobacion=' + idFlujo + '&userName=' + userName);
    }
} 


