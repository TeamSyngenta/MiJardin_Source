import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { notaContable } from '../../../interfaces/notaContable';
import { nuevoProducto } from '../../../interfaces/nuevoProducto';
import { envioCorreo } from '../../../interfaces/envioCorreo';

@Injectable({
  providedIn: 'root'
})



export class CrearNotaContableService {

  constructor(private http: HttpClient) { }

  getClientes(codCliente:string): Observable<any> {
      return this.http.get(environment.APIURL + '/ObtenerClientes?codCliente=' + codCliente);
  }
  getObtenerConceptos(): Observable<any> {
      return this.http.get(environment.APIURL + '/ObtenerConceptos');
  }
  getObtenerEntidadesLegales(idUC:string): Observable<any> {
      return this.http.get(environment.APIURL + '/ObtenerEntidadesLegales?idUC=' + idUC);
  }
  getObtenerNegocios(): Observable<any> {
      return this.http.get(environment.APIURL + '/ObtenerNegocios');
  }
  getObtenerPaises(): Observable<any> {
      return this.http.get(environment.APIURL + '/ObtenerPaises');
  }
  getObtenerRegiones(request): Observable<any> {
      return this.http.get(environment.APIURL + '/ObtenerRegiones?idPais=' + request);
  }
  getObtebtenerTiposMonedas(request): Observable<any> {
      return this.http.get(environment.APIURL + '/ObtenerTiposMonedas?idPais=' + request);
  }
  getObtenerUDN(request): Observable<any> {
      return this.http.get(environment.APIURL + '/ObtenerUDN?idPais=' + request);
  }
  getObtenerUnidadesComerciales(idPerfil, idPais): Observable<any> {
      return this.http.get(environment.APIURL + '/ObtenerUnidadesComerciales?idPerfil=' + idPerfil + '&idPais=' + idPais);
    }
    
  getObtenerMontos(): Observable<any> {
      return this.http.get(environment.APIURL + '/ObtenerMontos');
  }
  getObtenerProductos(paramBusqueda:string,tipoBusqueda:boolean,idUnidadComercial:string): Observable<any> {

      return this.http.get(environment.REPORTESURL + '/ObtenerProductos?descripcionProducto=' + paramBusqueda + '&parametroBusqueda=' + tipoBusqueda + '&idUnidadComercial=' + idUnidadComercial);
  }



  setNotaContable(nuevaNota: notaContable, arregloProductos: Array<nuevoProducto>): any {
      debugger;
      nuevaNota.arrayProductos = arregloProductos;
      
      return this.http.post(environment.APIURL + '/GuardarNC', nuevaNota);
  }

    enviarCorreo(nuevoCorreo: envioCorreo) {
        debugger;
      this.http.post(environment.MAILURL + '/EnviarCorreo', nuevoCorreo).subscribe(
          data => {
              return data;
          }
      )
  }
  setArchivosAdjuntos(files, idNC: number, idUsuario: number) {
    var datos = idNC + "|" + idUsuario;
    const formData = new FormData();


    for (let file of files)
      formData.append(datos, file);

      const uploadReq = new HttpRequest('POST', environment.APIURL + '/UploadFile',  formData , {
      reportProgress: true,
    });
    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.Response) {
      }
    });
  }

    getUnidadMedida(idNegocio: number): Observable<any> {
        return this.http.get(environment.UTILITARIOSURL + '/ObtenerUnidadMedida?idNegocio=' + idNegocio);
    }

    getObtenerTemporadas(idUC: number): Observable<any> {
        return this.http.get(environment.APIURL + '/ObtenerTemporadas?IdUC=' + idUC);
    }

    getObtenerProgramas(idTemporadas: number): Observable<any> {
        return this.http.get(environment.APIURL + '/ObtenerProgramas?idTemporadas=' + idTemporadas);
    }

    getObtenerCuentasContables(idUC: number): Observable<any> {
        return this.http.get(environment.APIURL + '/ObtenerCuentasContables?idUC=' + idUC);
    }
}


