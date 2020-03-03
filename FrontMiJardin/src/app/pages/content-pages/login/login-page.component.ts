import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SyngentaSeguridadService } from '../../../shared/services/syntenta-seguridad.service';
import {ModalDismissReasons, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {LayoutService} from '../../../shared/services/layout.service';
import {UsuarioResponse} from '../../../interfaces/UsuarioResponse';
import {RolResponse} from '../../../interfaces/RolResponse';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

    closeResult: string;
    modalOptions: NgbModalOptions = {
        backdrop: "static"
    };
    usuarioWS: UsuarioResponse;
    tituloPOPUP: any;
    mensajePOPUP: any;
    validacionUsuario: boolean;
    validacionPassword: boolean;
    // Generacion del Usuario
    usuario: UsuarioResponse;
    rol: RolResponse;



    constructor(private router: Router,
                private SyngentaSeguridadService: SyngentaSeguridadService,
                private modalService: NgbModal,
                private route: ActivatedRoute,
                private layoutService: LayoutService) {
    }


    onSubmit(loginForm: NgForm, content) {

        if (loginForm.value.userName === '' && loginForm.value.password === '') {
            this.tituloPOPUP = 'ERROR - Inicio de Sesión';
            this.mensajePOPUP = 'Se deben ingresar datos';
            this.abierto(content);
            return null;
        }

        if (loginForm.value.userName === '') {
            this.tituloPOPUP = 'ERROR - Inicio de Sesión';
            this.mensajePOPUP = 'Se debe ingresar un usuario';
            this.validacionUsuario = false;
            this.abierto(content);
            return null;
        }

        if (loginForm.value.password === '') {
            this.tituloPOPUP = 'ERROR - Inicio de Sesión';
            this.mensajePOPUP = 'Se debe ingresar una contraseña';
            this.validacionPassword = false;
            this.abierto(content);
            return null;
        }
        
        
        this.SyngentaSeguridadService.getValidarUsuario(loginForm.value.userName, loginForm.value.password).subscribe(
            data => {
                
                this.usuarioWS = data;
                if (!data.estado && data.idUsuario > 0) {
                    this.tituloPOPUP = 'ERROR - Inicio de Sesión';
                    this.mensajePOPUP = "Usuario no se encuentra activo";
                    this.abierto(content);
                } else if (data.idUsuario == 0) {
                    this.tituloPOPUP = 'ERROR - Inicio de Sesión';
                    this.mensajePOPUP = "Usuario o Contraseña inválidos, por favor intente de nuevo";
                    this.abierto(content);
                } else {
                    this.layoutService.guardarUsuarioLogeado(this.usuarioWS);
                    var listaRoles = data.roles.split(",", 1000);
                    this.layoutService.guardarRoles(listaRoles);
                    this.router.navigate(['/index']);
                }
            },
            error => {
                this.tituloPOPUP = 'ERROR - Inicio de Sesión';
                this.mensajePOPUP = 'ERR_CONNECTION_REFUSED - ERROR SERVER';
                this.abierto(content);
            }
        );

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

    ngOnInit(): void {

    }
}

