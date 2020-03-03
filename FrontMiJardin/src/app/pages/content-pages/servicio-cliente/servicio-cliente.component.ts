import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LayoutService } from '../../../shared/services/layout.service';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ServicioClienteService } from './servicio-cliente.service';
import { notaContableSAP } from '../../../interfaces/notaContableSAP';
import { detallesNotas } from '../../../interfaces/detallesNotas';
import { NotasCResponse } from '../../../interfaces/NotasCResponse';
import { ConsultarNotaContableService } from 'app/pages/content-pages/consulta-nota-contable/consulta-nota-contable.service';
import { archivosAdjuntosNota } from '../../../interfaces/archivosAdjuntosNota';
import { productosNotas } from '../../../interfaces/productosNota';


@Component({
    selector: 'app-servicio-cliente',
    templateUrl: './servicio-cliente.component.html',
    styleUrls: ['./servicio-cliente.component.scss']
})
export class ServicioClienteComponent implements OnInit {

    constructor(private layoutService: LayoutService, private ConsultarNotaContableServicio: ConsultarNotaContableService,
        private modalService: NgbModal, private ServicioCliente: ServicioClienteService,  private router: Router) { }

   
    modalOptions: NgbModalOptions = {
        size: 'lg',
        backdrop: "static"
    };
    closeResult: string;
    mensajePOPUP: any;
    tituloPOPUP: any;

    ocultarValores: boolean = true;
    page = 1;
    pageSize = 10;
    collectionSize = 0;
    roles: Array<any>;
    idRazonConsulta: number = 0;
    listaNotasSAP: Array<notaContableSAP>;
    objDetalles = new detallesNotas();
    buscarTexto: string = "";

    ngOnInit():void {
        this.roles = this.layoutService.consultarRoles();
        for (let rol of this.roles) {
            if (rol == 'AFO') this.idRazonConsulta = 44;
        }
        this.ServicioCliente.getObtenerNotasContables(this.idRazonConsulta).subscribe(
            data => {
                debugger;
                this.listaNotasSAP = data;
                this.collectionSize = this.listaNotasSAP.length;
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

    abierto(content) {
        this.modalService.open(content, this.modalOptions).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    verAcciones(notas,contentAcciones) {
        this.tituloPOPUP = "SERVICIO CLIENTE - ACCIONES";
        this.abierto(contentAcciones);
        
        this.NotaSeleccionada = notas;
    }

    agregarSap(contentSap) {
        this.tituloPOPUP = "SERVICIO CLIENTE - AGREGAR SAP";
        this.abierto(contentSap);
    }
    NotaSeleccionada: NotasCResponse;
    listaAdjunto: Array<archivosAdjuntosNota>;
    listaProductosNotas: Array<productosNotas>;
    verDetalles(contentDetalles) {
        
        this.tituloPOPUP = "SERVICIO CLIENTE - VER DETALLES";
        this.abierto(contentDetalles);
        
        this.ConsultarNotaContableServicio.getObtenerDetallesNotas(this.NotaSeleccionada.idNotaContable).subscribe(
            data => {
                debugger;
                this.objDetalles = data;

                if (this.objDetalles.concepto == "Rebate") {
                    this.ocultarValores = false; 
                } else {
                    this.ocultarValores = true;
                }
            });

        this.ConsultarNotaContableServicio.getObtenerAdjuntosNota(this.NotaSeleccionada.idNotaContable).subscribe(
            data => {
                this.listaAdjunto = data;
            });

        this.ConsultarNotaContableServicio.getObtenerProductosNota(this.NotaSeleccionada.idNotaContable).subscribe(
            data => {
                this.listaProductosNotas = data;
            });
    }

    agregarCodigoSAP(contentConfirmacion){
        this.abierto(contentConfirmacion);
    }
    valInputSAP: boolean = true;
    estadoBoton() {
        
        if (/^[0-9]+$/.test(this.codSapForm)) this.valInputSAP = false;
        else this.valInputSAP = true;
        
    }
    codSapForm: string;
    guardarCodigoSAP(codSapNuevo: string) {
        this.ServicioCliente.setActualizarSapNotaContable(this.NotaSeleccionada.idNotaContable, codSapNuevo).subscribe(
            data => {
                location.reload(true);
            }
        );
    }
}

