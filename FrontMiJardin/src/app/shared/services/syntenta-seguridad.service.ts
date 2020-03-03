import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UsuarioResponse } from '../../interfaces/UsuarioResponse';
import { RolResponse } from '../../interfaces/RolResponse';

@Injectable({
    providedIn: 'root'
})
export class SyngentaSeguridadService {

   
    constructor(private http: HttpClient) {
    }

    getValidarUsuario(usuario: any, pass: any): Observable<any> {
        var usuarioVal = new UsuarioResponse();
        usuarioVal.password = pass;
        usuarioVal.userName = usuario;
        return this.http.post(environment.SEGURIDADURL + "/ValidarIngresoUsuario", usuarioVal);
    }

    
    getRoles(): Observable<any> {
        
        return this.http.get(environment.SEGURIDADURL + "/ObtenerRoles");
    }
   
    getUsuarios(idUsuario): Observable<any> {
        return this.http.get(environment.SEGURIDADURL + "/ConsultarUsuarios?idUsuario=" + idUsuario);
    }

    cambiarEstadoUsuario(idUsuario: number, estado: boolean): Observable<any> {
        
        return this.http.get(environment.SEGURIDADURL + "/ActualizarEstadoUsuario?idUsuario=" + idUsuario +"&estado="+estado);
    }
    guardarUsuario(usuarioNuevo: UsuarioResponse): Observable<any> {
        return this.http.post(environment.SEGURIDADURL + "/CrearUsuario", usuarioNuevo);
    }

    actualizarRoles(rolesNuevos: Array<RolResponse>): Observable<any> {

        return this.http.post(environment.SEGURIDADURL + "/ActualizarRolesUsuario", rolesNuevos);
        /*return this.http.post(this.accesoCore + this.actualizarRolesURL, {
            userName: usuario,
            lstRoles: rolesNuevos.toString()
        });*/
    }
    /*
   

    

   
    */
}
