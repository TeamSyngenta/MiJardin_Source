import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LayoutService } from '../../../shared/services/layout.service';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ServicioAdminAprobadoresService } from './administrador-aprobadores.service';
import { tipoEstandar } from '../../../interfaces/tipoEstandar';
import { Aprobadores } from '../../../interfaces/Aprobadores';
import { DatosBusquedaAprobadores } from '../../../interfaces/DatosBusquedaAprobadores';
import { ActualizarUserNameAprobador } from '../../../interfaces/ActualizarUserNameAprobador';



@Component({
    selector: 'app-administrador-aprobadores',
    templateUrl: './administrador-aprobadores.component.html',
    styleUrls: ['./administrador-aprobadores.component.scss']
})
export class AdministradorAprobadoresComponent implements OnInit {

    constructor(private layoutService: LayoutService,
        private modalService: NgbModal, private ServicioAdminAprobadores: ServicioAdminAprobadoresService, private router: Router) { }

   
    /*variables modales*/
    modalOptions: NgbModalOptions = {
        size: 'lg',
        backdrop: "static"
    };
    closeResult: string;
    mensajePOPUP: any;
    tituloPOPUP: any;

    /*variables paginacion*/
    page = 1;
    pageSize = 10;
    collectionSize = 0;
    ocultarBtnActualizar = true;
    /*variables listas*/
    listaNegocios: Array<tipoEstandar>;
    listaConceptos: Array<tipoEstandar>;
    listaUnidadComercial: Array<tipoEstandar>;
    listaMontoAprobadores: Array<tipoEstandar>;
    listaAprobadores: Array<Aprobadores>;
 
    datosBusquedaAprobadores: DatosBusquedaAprobadores = new DatosBusquedaAprobadores;
    datosActualizarAprobadores: ActualizarUserNameAprobador = new ActualizarUserNameAprobador;
    aprobadores: Aprobadores = new Aprobadores;
    userNameNuevo = '';

    /* Funciones Modales*/
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    abierto(content) {
        this.modalService.open(content, this.modalOptions).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }


    ngOnInit(): void {

        this.ServicioAdminAprobadores.getObtenerNegocios().subscribe(
            data => {
                this.listaNegocios = data;
            });


        this.ServicioAdminAprobadores.getObtenerConceptos().subscribe(
            data => {
                this.listaConceptos = data;
            });

        this.ServicioAdminAprobadores.getObtenerUnidadesComerciales().subscribe(
            data => {
                this.listaUnidadComercial = data
            });
    }
    
    ObtenerMontosAprobadores(idConcepto) {
       
        this.ServicioAdminAprobadores.getObtenerMontosAprobadores(idConcepto).subscribe(
            data => {
                this.listaMontoAprobadores = data
            });
    }
    BuscarAprobadores(contentError, contentValidacion) {
        
        if (this.datosBusquedaAprobadores.idUnidadComercial == 0) {
            this.mensajePOPUP = "Debe seleccionar una unidad comercial";
            this.abierto(contentValidacion);
        } else if (this.datosBusquedaAprobadores.idNegocio == 0) {
            this.mensajePOPUP = "Debe seleccionar un negocio";
            this.abierto(contentValidacion);
        } else if (this.datosBusquedaAprobadores.idConcepto == 0) {
            this.mensajePOPUP = "Debe seleccionar un concepto";
            this.abierto(contentValidacion);
        }else if (this.datosBusquedaAprobadores.idMonto == 0) {
            this.mensajePOPUP = "Debe seleccionar un monto";
            this.abierto(contentValidacion);
        } else {
        this.ServicioAdminAprobadores.getObtenerAprobadores(this.datosBusquedaAprobadores.idConcepto, this.datosBusquedaAprobadores.idUnidadComercial, this.datosBusquedaAprobadores.idNegocio, this.datosBusquedaAprobadores.idMonto).subscribe(
            data => {
               
                this.listaAprobadores = data
                if (this.listaAprobadores.length == 0) {
                    this.abierto(contentError);
                }
                for (var i = 0; i < this.listaAprobadores.length; i++) {
                    this.listaAprobadores[i].activarBtnActualizar = true;
                }
            });
        }
        this.ocultarBtnActualizar = true;
    }

    nuevoAprobador: Aprobadores;

    validarUserNameAprobador(nuevoAprobador: Aprobadores, contentUserName, contentActualizar) {


        this.ServicioAdminAprobadores.validarUsername(nuevoAprobador.userName).subscribe(
            data => {
                
                var res = data
                if (!res) {
                    this.abierto(contentUserName);
                } else {
                    this.nuevoAprobador = nuevoAprobador;
                    this.abierto(contentActualizar);
                }
            });
    }



    ActualizarUserNameAprobador(contentconfirmacion) {
        
        this.ServicioAdminAprobadores.ActualizarUserNameAprobacion(this.nuevoAprobador.idFlujo, this.nuevoAprobador.userName).subscribe(
            data => {
                var act = data;
                this.nuevoAprobador = new Aprobadores();
                if (act) this.abierto(contentconfirmacion);
                this.ServicioAdminAprobadores.getObtenerAprobadores(this.datosBusquedaAprobadores.idConcepto, this.datosBusquedaAprobadores.idUnidadComercial, this.datosBusquedaAprobadores.idNegocio, this.datosBusquedaAprobadores.idMonto).subscribe(
                    data => {
                        this.listaAprobadores = data
                        if (this.listaAprobadores.length == 0) {
                            this.abierto(null);
                        }
                    });
            });
        
    }

    ocultarNombre(index) {
        
        var datosAprobador = this.listaAprobadores[index];
        datosAprobador.nombre = "";
        datosAprobador.activarBtnActualizar = false;
        this.listaAprobadores[index] = datosAprobador;
    }
}

