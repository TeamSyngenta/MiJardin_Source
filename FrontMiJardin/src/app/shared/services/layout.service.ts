import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import { UsuarioResponse } from '../../interfaces/UsuarioResponse';

@Injectable({
    providedIn: 'root'
})
export class LayoutService {

    private emitChangeSource = new Subject<any>();
    changeEmitted$ = this.emitChangeSource.asObservable();
    private ListaRoles: Array<any>;
    private usuarLogeado: string;
    private usuarioObjeto: UsuarioResponse = new UsuarioResponse();

    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }

    guardarRoles(roles: Array<any>){
        localStorage.setItem('userLogin', JSON.stringify(roles));
        return this.ListaRoles = roles;
    }

    consultarRoles(){
        this.ListaRoles = JSON.parse(localStorage.getItem('userLogin'));
        return this.ListaRoles;
    }

    guardarUsuarioLogeado(usuario: UsuarioResponse) {
        
        if (usuario == null) {
            localStorage.setItem('userNameLogin', JSON.stringify(null));
            localStorage.setItem('userNameId', JSON.stringify(null));
            localStorage.setItem('correoUsuario', JSON.stringify(null));
            return this.usuarLogeado = null;
        } else {
            localStorage.setItem('userNameLogin', JSON.stringify(usuario.userName));
            localStorage.setItem('userNameId', JSON.stringify(usuario.idUsuario));
            localStorage.setItem('correoUsuario', JSON.stringify(usuario.correo));
            return this.usuarLogeado = usuario.userName;
        }
        
        
    }

    consultarUsuarioLogeado() {
        this.usuarioObjeto.userName = JSON.parse(localStorage.getItem('userNameLogin'));
        this.usuarioObjeto.idUsuario = JSON.parse(localStorage.getItem('userNameId'));
        this.usuarioObjeto.correo = JSON.parse(localStorage.getItem('correoUsuario'));
        return this.usuarioObjeto;
    }

}
