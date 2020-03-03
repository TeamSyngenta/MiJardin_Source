import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LayoutService } from '../../../shared/services/layout.service';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NotasCResponse } from '../../../interfaces/NotasCResponse';
import { ConsultarNotaContableService } from './consulta-nota-contable.service';
import { tipoEstandar } from '../../../interfaces/tipoEstandar';
import { filtroProducto } from '../../../interfaces/filtroProducto';
import { consultaNotaContable } from '../../../interfaces/consultaNotaContable';
import { detallesNotas } from '../../../interfaces/detallesNotas';
import { archivosAdjuntosNota } from '../../../interfaces/archivosAdjuntosNota';
import { DomSanitizer } from '@angular/platform-browser';
import { productosNotas } from '../../../interfaces/productosNota';
import { nuevoProducto } from '../../../interfaces/nuevoProducto';
import { saveAs } from 'file-saver';
import { map } from "rxjs/operators";


@Component({
    selector: 'app-consulta-nota-contable',
    templateUrl: './consulta-nota-contable.component.html',
    styleUrls: ['./consulta-nota-contable.component.scss']
})
export class ConsultaNotaContableComponent implements OnInit {

    constructor(private layoutService: LayoutService,
        private modalService: NgbModal, private ConsultarNotaContable: ConsultarNotaContableService, private sanitizer: DomSanitizer, private router: Router) { }

    datosBusqueda: consultaNotaContable = new consultaNotaContable();
    productoSeleccionado: filtroProducto;
    nombreProductoMostar = '';
    page = 1;
    pageSize = 10;
    collectionSize = 0;
    pagePro = 1;
    pageSizePro = 10;
    collectionSizePro = 0;
    validacionNC = true;
    buscarProducto: string = "";
    fileurl;
    modalOptions: NgbModalOptions = {
        size: 'lg',
        backdrop: "static"
    };
    closeResult: string;
    parametroBuscar: string;
    tituloPOPUP: any;
    adjunto: Array<archivosAdjuntosNota> = null;
    buscarProd: string;
    parametroBusqueda: boolean;
    mensajeBuscar = "display: none;";
    mensajePOPUP: any;
    listaProductos: Array<filtroProducto>;
    listaEstado: Array<tipoEstandar>[];
    listaDetalles = new detallesNotas();
    listaAdjunto: Array<archivosAdjuntosNota>;
    listaProductosNotas: Array<productosNotas>;
    NotasC: Array<NotasCResponse> = null;
    NotaSeleccionada: NotasCResponse;
    idNotaC = 0;
    producto = new nuevoProducto();
    ocultarObservaciones: boolean = true;
    ocultarValores: boolean = true;



    ngOnInit() {

        this.datosBusqueda = new consultaNotaContable();

        this.ConsultarNotaContable.getObtenerEstados().subscribe(
            data => {
                this.listaEstado = data;
            });

    }

    buscarProductos(buscarProd, parametroBusqueda, idUnidadComercial, modalContentError) {
        idUnidadComercial = 0;
        if (buscarProd == '' || buscarProd == undefined && parametroBusqueda == undefined || parametroBusqueda == null) {
            this.tituloPOPUP = "ERROR - CREAR NOTA CONTABLE";
            this.mensajePOPUP = 'Ingrese los parametros de búsqueda (Descripción o Cód. Material sin marcar)';
            this.abierto(modalContentError);
            return null;


        } else if (buscarProd == '' || buscarProd == undefined) {
            this.tituloPOPUP = "ERROR - CONSULTAR NOTAS CONTABLES";
            this.mensajePOPUP = 'Ingrese datos en el campo Buscar para realizar la acción';
            this.abierto(modalContentError);
            return null;
        }
        if (buscarProd.length >= 4) {
            this.ConsultarNotaContable.getObtenerProductos(buscarProd, parametroBusqueda, idUnidadComercial).subscribe(
                data => {
                    this.listaProductos = data;
                    this.collectionSizePro = this.listaProductos.length;
                    if (this.listaProductos.length > 0) this.ocultarTablaProductos = false
                });

        }


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

    mostrarProductos(contentModificar) {
        this.tituloPOPUP = "CONSULTAR NOTAS CONTABLES - BUSCAR PRODUCTOS";
        this.abierto(contentModificar);
    }

    verDetalles(notasContables, contentModificar) {
        
        this.tituloPOPUP = "CONSULTAR NOTAS CONTABLES - VER DETALLES";
        this.abierto(contentModificar);
        this.NotaSeleccionada = notasContables;
        this.idNotaC = notasContables.idNotaContable;
        this.ConsultarNotaContable.getObtenerDetallesNotas(this.idNotaC).subscribe(
            data => {
                
                this.listaDetalles = data;

                if (this.listaDetalles.observaciones != null) {
                    this.ocultarObservaciones = false;
                } else {
                    this.ocultarObservaciones = true;
                }
                if (this.listaDetalles.concepto == "Rebate") {
                    this.ocultarValores = false;
                } else {
                    this.ocultarValores = true;
                }
                    
            });
       

        this.ConsultarNotaContable.getObtenerAdjuntosNota(this.idNotaC).subscribe(
            data => {
                this.listaAdjunto = data;
            });

        this.ConsultarNotaContable.getObtenerProductosNota(this.idNotaC).subscribe(
            data => {
                this.listaProductosNotas = data;
            });
    }

    SeleccionarProducto(produc: filtroProducto) {

        this.datosBusqueda.productoSeleccionado = 0;
        this.productoSeleccionado = produc;
        this.nombreProductoMostar = produc.nombre;
        this.listaProductos = [];
        this.buscarProd = '';
        this.parametroBusqueda = null;
        this.producto.nombreProducto = this.productoSeleccionado.nombre;
        this.producto.idProducto = this.productoSeleccionado.tipo.toString();
        this.datosBusqueda.productoSeleccionado = this.productoSeleccionado.tipo;
    }


    limpiarCerrar() {
        
        this.listaProductos = [];
        this.buscarProd = '';
        this.nombreProductoMostar = '';
        this.datosBusqueda.productoSeleccionado = 0;
        this.parametroBusqueda = null;
        this.ocultarMensajeDes = true;
        this.ocultarMensajeCod = true;
        this.habilitarBoton = true;
        this.ocultarTablaProductos = true;
        this.datosBusqueda = new consultaNotaContable();
    }

    ocultarMensajeDes: boolean = true;
    ocultarMensajeCod: boolean = true;
    ocultarTablaProductos: boolean = true;
    habilitarBoton = true;

    visualizarMensaje() {
        
        if (this.parametroBusqueda.toString() == "true") {
            this.ocultarMensajeDes = false;
            this.ocultarMensajeCod = true;
            this.habilitarBoton = false;
        } else {
            this.ocultarMensajeDes = true;
            this.ocultarMensajeCod = false;
            this.habilitarBoton = false;
        }

    }

    buscar(modalContentError) {
        debugger;
        if (this.datosBusqueda.fechaFinal == null && this.datosBusqueda.fechaInicio == null && this.datosBusqueda.codCliente == null && this.datosBusqueda.idEstadoNota == 0 && this.datosBusqueda.idNotaContable == null && this.datosBusqueda.idNotaContableSap == null && this.datosBusqueda.productoSeleccionado == 0 && this.datosBusqueda.tipoNotaContable == 2) {
            this.tituloPOPUP = "ERROR - CONSULTAR NOTAS CONTABLES";
            this.mensajePOPUP = 'Debe ingresar datos para realizar la busqueda'
            this.abierto(modalContentError);
            return null;
        } else {
            if (this.datosBusqueda.codCliente != null) {
                if (this.datosBusqueda.codCliente.length <= 0) this.datosBusqueda.codCliente = null;
            }
            if (this.datosBusqueda.idNotaContable == null) this.datosBusqueda.idNotaContable = 0;
            this.ConsultarNotaContable.ConsultarNotas(this.datosBusqueda).subscribe(
                data => {
                    
                    this.NotasC = data;
                    

                    if (this.NotasC == null) {
                        this.tituloPOPUP = "ERROR - CONSULTAR NOTAS CONTABLES";
                        this.mensajePOPUP = 'No se encontraron registros para los datos ingresados'
                        this.abierto(modalContentError);
                    }
                    else if (this.NotasC.length == 0) {
                        this.tituloPOPUP = "ERROR - CONSULTAR NOTAS CONTABLES";
                        this.mensajePOPUP = 'No se encontraron registros para los datos ingresados'
                        this.abierto(modalContentError);
                    } else {
                        this.collectionSize = this.NotasC.length;
                        var usuarioLogeado = this.layoutService.consultarUsuarioLogeado().userName;
                        
                        for (var i = 0; i < this.NotasC.length; i++) {
                            
                            if ((this.NotasC[i].estado == "Borrador" || this.NotasC[i].estado == "Anulada") && usuarioLogeado === this.NotasC[i].usuarioCreacion) {
                                this.NotasC[i].mostrarRecall = false;
                            } else {
                                this.NotasC[i].mostrarRecall = true;
                            }
                        }
                    }
                });
        }

       

    }

    urlFile: string = null;
    nombreArchivo: string = null;

    modificarNota() {
        this.router.navigate(['/index']);
    }


    downloadFile(adjuntos: archivosAdjuntosNota) {
        let fileName = (adjuntos.pathsArchivo + adjuntos.nombreArchivo);
        var fileType;
        fileType = "APPLICATION/octet-stream";

        this.ConsultarNotaContable.DownloadFile(fileName, fileType)
            .subscribe(
                success => {
                    saveAs(success, adjuntos.nombreArchivo);
                },
                err => {
                    alert("Server error while downloading fi  le.");
                }
            );
    }

}

