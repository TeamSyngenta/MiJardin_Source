import { Component, OnInit, PipeTransform } from '@angular/core';
import { LayoutService } from '../../../shared/services/layout.service';
import { NgForm } from '@angular/forms';
import { SyngentaSeguridadService } from '../../../shared/services/syntenta-seguridad.service';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { RolResponse } from '../../../interfaces/RolResponse';
import { UsuarioResponse } from '../../../interfaces/UsuarioResponse';



@Component({
    selector: 'app-administracion-usuario',
    templateUrl: './administracion-usuario.component.html',
    styleUrls: ['./administracion-usuario.component.scss']
})
export class AdministracionUsuarioComponent implements OnInit {

    constructor(private layoutService: LayoutService,
        private SyngentaSeguridadService: SyngentaSeguridadService,
        private modalService: NgbModal, ) { }

    page = 1;
    pageSize = 5;
    collectionSize = 0;
    buscarTexto: string = "";

    usuarios: Array<UsuarioResponse> = null;


    guardarUsuarioForm: NgForm;
    closeResult: string;
    modalOptions: NgbModalOptions = {
        backdrop: "static"
    };
    tituloPOPUP: any;
    mensajePOPUP: any;
    roles: Array<RolResponse> = null;

    rolesSeleccionados: Array<number> = [];
    rolesNuevos: Array<RolResponse> = [];
    estadoNuevo: any;
    validarRolActivoUsuario: any = false;
    arrayGuia: Array<any> = [];
    usuarioNuevo: UsuarioResponse = new UsuarioResponse ();
    usuarioLogeado: UsuarioResponse ;
    reloadVar = false;


    ngOnInit() {
        
        this.usuarioNuevo = new UsuarioResponse();
        this.rolesSeleccionados = [];
        this.rolesNuevos = [];
        this.arrayGuia = this.layoutService.consultarRoles();
        for (let rol of this.arrayGuia) {
            if (rol === 'ADMINISTRADOR') {
                this.validarRolActivoUsuario = true;
                break;
            }
        }

        this.SyngentaSeguridadService.getRoles().subscribe(
            data => {

                this.roles = data;
            });

        this.usuarioLogeado = this.layoutService.consultarUsuarioLogeado();
        this.SyngentaSeguridadService.getUsuarios(this.usuarioLogeado.idUsuario).subscribe(
            data => {
                this.usuarios = data;
                for (var i = 0; i < this.usuarios.length; i++) {
                    this.usuarios[i].lstRolesString = this.usuarios[i].roles.split(",", 1000);
                }
                this.collectionSize = this.usuarios.length;

            }
        );
    }

    cambiarEstadoUsuario(userName, estadoNuevo, contentSalir) {

        this.tituloPOPUP = "CONFIRMACIÓN - ADMINISTRACIÓN DE USUARIO";
        this.estadoNuevo = estadoNuevo;

        if (this.estadoNuevo === false) {
            this.mensajePOPUP = "El usuario fue activado con éxito.";
        } else {
            this.mensajePOPUP = "El usuario fue desactivado con éxito.";

        }

        this.SyngentaSeguridadService.cambiarEstadoUsuario(userName, !this.estadoNuevo).subscribe(
            data => {
                this.abierto(contentSalir);
            });
    }

    abierto(content) {
        this.modalService.open(content, this.modalOptions).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }


    cancelarCrearUsuario(contentModal) {
        this.tituloPOPUP = "ADMINISTRACIÓN DE USUARIO";
        this.mensajePOPUP = "¿Está seguro de cancelar la operación?";
        this.abierto(contentModal);

    }

    validarUsuarioRegistrado(userNameNuevo: string) {
        
        if (this.usuarioLogeado.userName.toUpperCase() === userNameNuevo.toUpperCase()) return false;
        for (let usuarios of this.usuarios) {
            if (usuarios.userName.toUpperCase() === userNameNuevo.toUpperCase()) {
                return false;
            }
        }
        return true;
    }

    onSubmit(loginForm: NgForm, contentError, contetConfirmacion) {
        
        this.guardarUsuarioForm = loginForm;

       
        if (this.usuarioNuevo.userName == null || this.usuarioNuevo.userName == '' ) {
            this.tituloPOPUP = "ERROR - ADMINISTRACIÓN DE USUARIO";
            this.mensajePOPUP = "Debe ingresar el campo Usuario, recuerde que no se permiten caracteres extraños";
            this.abierto(contentError);
            return null;

        }

        if (this.usuarioNuevo.correo == null || this.usuarioNuevo.correo == '') {
            this.tituloPOPUP = "ERROR - ADMINISTRACIÓN DE USUARIO";
            this.mensajePOPUP = "Debe ingresar el campo Correo Electrónico";
            this.abierto(contentError);
            return null;

        }

        if (this.usuarioNuevo.nombre == null || this.usuarioNuevo.nombre == '') {
            this.tituloPOPUP = "ERROR - ADMINISTRACIÓN DE USUARIO";
            this.mensajePOPUP = "Debe ingresar el campo Nombre";
            this.abierto(contentError);
            return null;

        }

        if (this.usuarioNuevo.apellido == null || this.usuarioNuevo.apellido == '') {
            this.tituloPOPUP = "ERROR - ADMINISTRACIÓN DE USUARIO";
            this.mensajePOPUP = "Debe ingresar el campo Apellido";
            this.abierto(contentError);
            return null;

        }

        
        if (this.usuarioNuevo.password == null || this.usuarioNuevo.password == '') {
            this.tituloPOPUP = "ERROR - ADMINISTRACIÓN DE USUARIO";
            this.mensajePOPUP = "Debe ingresar el campo Contraseña";
            this.abierto(contentError);
            return null;

        }
        if (this.usuarioNuevo.contrasena2 == null || this.usuarioNuevo.contrasena2 =='') {
            this.tituloPOPUP = "ERROR - ADMINISTRACIÓN DE USUARIO";
            this.mensajePOPUP = "Debe ingresar el campo Confirmar Contraseña";
            this.abierto(contentError);
            return null;

        }


        if (this.guardarUsuarioForm.control.status === "INVALID") {
            
            this.tituloPOPUP = "ERROR - ADMINISTRACIÓN DE USUARIO";
            console.log(this.guardarUsuarioForm.control.controls.userName.status);
            if (this.guardarUsuarioForm.form.value.email != null && this.guardarUsuarioForm.form.controls.email.status === "INVALID") {
                this.mensajePOPUP = "Formato de correo no es válido";
            }
            if (this.guardarUsuarioForm.control.controls.userName.status === "INVALID") {
                this.mensajePOPUP = "El el campo Usuario no se permiten caracteres especiales";
            }
            
            this.abierto(contentError);
            return null;
        } else if (this.guardarUsuarioForm.form.value.pass.length < 4) {
            this.tituloPOPUP = "ERROR - ADMINISTRACIÓN DE USUARIO";
            this.mensajePOPUP = "La contraseña debe tener mínimo 4 caracteres";
            this.abierto(contentError);
            return null;
        }
        else if (this.guardarUsuarioForm.form.value.pass !== this.guardarUsuarioForm.form.value.pass2) {
            this.tituloPOPUP = "ERROR - ADMINISTRACIÓN DE USUARIO";
            this.mensajePOPUP = "La contraseña no coincide";
            this.abierto(contentError);
            return null;
        }

        if (!this.validarUsuarioRegistrado(this.guardarUsuarioForm.value.userName)) {
            this.tituloPOPUP = "ERROR - ADMINISTRACIÓN DE USUARIO";
            this.mensajePOPUP = "El usuario ya existe, verifique por favor";
            this.abierto(contentError);
            return null;
        }

        if (this.rolesSeleccionados.length === 0) {
            this.tituloPOPUP = "ERROR - ADMINISTRACIÓN DE USUARIO";
            this.mensajePOPUP = "Debe seleccionar al menos un rol";
            this.abierto(contentError);
            return null;

        }

       
        this.tituloPOPUP = "CONFIRMACIÓN - ADMINISTRACIÓN DE USUARIO";
        this.mensajePOPUP = "¿Está seguro de crear el Usuario?";
        this.abierto(contetConfirmacion);

    }

    listaRoles(content) {
        debugger;
        if (content.checked) {
            this.rolesSeleccionados.push(parseInt(content.value));
        } else {
            var index = this.rolesSeleccionados.indexOf(parseInt(content.value));
            if (index > -1) {
                this.rolesSeleccionados.splice(index, 1);
            }
        }

    }

    refrescarPagina() {
        
        if (this.reloadVar) location.reload(true);
    }

    guardarUsuario(contentError, contetConfirmacion) {

        let rolN = new RolResponse();
        for (let idRolN of this.rolesSeleccionados) {
            rolN.idRol = idRolN;
            rolN.idUsuario = 0;
            this.rolesNuevos.push(rolN);
            rolN = new RolResponse();
        }

        this.usuarioNuevo.listaRoles = this.rolesNuevos;
        this.SyngentaSeguridadService.guardarUsuario(this.usuarioNuevo).subscribe(
            data => {

                if (data === false) {
                    this.tituloPOPUP = "ERROR - ADMINISTRACIÓN DE USUARIO";
                    this.mensajePOPUP = "Usuario no fue creado correctamente, contacte al administrador";
                    this.abierto(contentError);
                } else {
                    this.tituloPOPUP = "CONFIRMACIÓN - ADMINISTRACIÓN DE USUARIO";
                    this.mensajePOPUP = "Usuario " + this.usuarioNuevo.userName + "creado correctamente";
                    this.abierto(contentError);
                }

            }
        );
        location.reload(true);
    }

    usuarioModificar: any;
    usuarioModificado: any;
    rolesObtenidos: Array<any> = [];

    modificarRoles(idUsuario: any, rolesObtenidos: Array<any>, contentModificar, userName: any, ) {
        debugger;
        this.reloadVar = true;
        this.rolesObtenidos = rolesObtenidos;
        this.rolesSeleccionados = [];
        for (let rol of this.roles) {
            for (let nombreRol of rolesObtenidos)
                if (rol.nombre == nombreRol) {
                    this.rolesSeleccionados.push(rol.idTipo);
                }
        }

        this.usuarioModificado = userName;
        this.usuarioModificar = idUsuario;
        this.abierto(contentModificar);

    }

    validarRolesActivos(rol) {
        for (let rolSeleccionado of this.rolesObtenidos) {
            if (rolSeleccionado === rol.nombre) {
                return true;
            }
        }
        return false;
    }

    actualizarRoles(contentError, contentCerrar) {
        
        if (this.rolesSeleccionados.length === 0) {
            this.reloadVar = false;
            this.tituloPOPUP = "ERROR - ADMINISTRACIÓN DE USUARIO";
            this.mensajePOPUP = "Debe seleccionar o modificar al menos un rol";
            this.abierto(contentError);
            return null;
        }

        let rolN = new RolResponse();
        for (let idRolN of this.rolesSeleccionados) {
            rolN.idRol = idRolN;
            rolN.idUsuario = this.usuarioModificar;
            this.rolesNuevos.push(rolN);
            rolN = new RolResponse();
        }
        this.SyngentaSeguridadService.actualizarRoles(this.rolesNuevos).subscribe(
            data => {
                //this.usuarios = this.SyngentaSeguridadService.getUsuarios(this.layoutService.consultarUsuarioLogeado());
                
                if (data === false) {
                    this.tituloPOPUP = "ERROR - ADMINISTRACIÓN DE USUARIO";
                    this.mensajePOPUP = "Roles no fueron actualizados correctamente, contacte al administrador";
                    this.abierto(contentError);
                } else {
                    this.tituloPOPUP = "CONFIRMACIÓN - ADMINISTRACIÓN DE USUARIO";
                    this.mensajePOPUP = "Roles modificados con éxito.";
                    this.reloadVar = true;
                    this.abierto(contentError);
                }
                
            });
    }

    actualizarPaginacion() {
        this.page = 1;
    }

}
