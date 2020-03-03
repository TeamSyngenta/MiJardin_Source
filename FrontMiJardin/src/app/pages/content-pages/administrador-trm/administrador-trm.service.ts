import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable, using } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { tipoMoneda } from '../../../interfaces/TipoMoneda';


@Injectable({
  providedIn: 'root'
})



export class AdministradorTRMService {

    constructor(private http: HttpClient) { }
    
   getObtenerValorMoneda(): Observable<any> {
       return this.http.get(environment.UTILITARIOSURL + '/ObtenerValorMoneda');
    }

    
   ActualizarValorMoneda(listaValor: Array<tipoMoneda>) {
       return this.http.post(environment.UTILITARIOSURL + '/ActualizarValorMoneda', listaValor)

    }
}


