import { Component, OnInit, Directive, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { LayoutService } from 'app/shared/services/layout.service';
import { ChartOptions, ChartType, ChartDataSets, ChartFontOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ConsultarNotaContableService } from 'app/pages/content-pages/consulta-nota-contable/consulta-nota-contable.service';
import { AdministracionFlujoAprobacionService } from './administracion-flujo-aprobacion.service';
import { NotasCResponse } from '../../../interfaces/NotasCResponse';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { detallesNotas } from '../../../interfaces/detallesNotas';
import { archivosAdjuntosNota } from '../../../interfaces/archivosAdjuntosNota';
import { productosNotas } from '../../../interfaces/productosNota';
import { saveAs } from 'file-saver';
import { aprobacionNC } from '../../../interfaces/aprobacionNC';
import { DatosEstadistcas } from '../../../interfaces/DatosEstadisticas';
import { tipoEstandar } from '../../../interfaces/tipoEstandar';


@Component({
    selector: 'app-administracion-flujo-aprobacion',
    templateUrl: './administracion-flujo-aprobacion.component.html',
    styleUrls: ['./administracion-flujo-aprobacion.component.scss']
})
export class AdministracionFlujoAprobacionComponent implements OnInit {

    constructor(private router: Router, private http: HttpClient, private usuarioLogueado: LayoutService, private ServicioAprobacion: AdministracionFlujoAprobacionService, private modalService: NgbModal, private ConsultarNotaContableServicio: ConsultarNotaContableService) { }
    mensajePOPUP: any;
    tituloPOPUP: any;
    closeResult: string;
    modalOptions: NgbModalOptions = {
        size: 'lg',
        backdrop: "static"
    };
    
    datosEstaditicasBar: DatosEstadistcas;
    page = 1;
    pageSize = 10;
    collectionSize = 0;
    buscarTexto: string = "";
    NotaSeleccionada: NotasCResponse;
    idNotaC = 0;
    objDetalles = new detallesNotas();
    listaAdjunto: Array<archivosAdjuntosNota>;
    listaProductosNotas: Array<productosNotas>;
    habilitarConObservacion = false;
    observaciones = '';
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


    barChartOptions: ChartOptions = {
        responsive: true,
    };
    barChartSize: ChartFontOptions = {
        defaultFontSize: 10,
    }
    barChartLabels: Label[] = ['Notas Contables'];
    barChartType: ChartType = 'bar';
    barChartLegend = true;
    barChartPlugins = [];






    //doughnutChartLabels = ['Anuladas', 'Aprobadas', 'Por aprobar', 'Devueltas'];
    doughnutChartLabels =  [" "," "," "," "];
    doughnutChartData = [0, 0, 0, 0];
    doughnutChartType = 'doughnut';

    donutColors = [
        {
            backgroundColor: [
                'rgba(63, 255, 51, 1)',
                'rgba(255, 131, 51, 1)',
                'rgba(68, 76, 232, 1)',
                'rgba(242, 39, 39, 1)'
            ]
        }
    ];


    listaNotas: Array<NotasCResponse> = null;
    
    listaEstado: Array<tipoEstandar>;
    estadoBorrador: tipoEstandar = new tipoEstandar();
    mostrarGrafica = true;
    ngOnInit() {
        this.estadoBorrador.idTipo = 2;
        this.estadoBorrador.nombre = "Borrador";
        

        var idUsuario = this.usuarioLogueado.consultarUsuarioLogeado().idUsuario;
        var userName = this.usuarioLogueado.consultarUsuarioLogeado().userName;
        this.ServicioAprobacion.getObtenerNotasAprobacion(idUsuario).subscribe(
            data => {
                this.listaNotas = data;

                this.collectionSize = this.listaNotas.length;
            });
        this.ServicioAprobacion.getObtenerEstadisticas(userName).subscribe(
            data => {

                this.datosEstaditicasBar = data;
                if (this.datosEstaditicasBar.notasAprobadas == 0 && this.datosEstaditicasBar.notasDevueltas == 0 && this.datosEstaditicasBar.notasPorAprobar == 0 && this.datosEstaditicasBar.notasAnuladas == 0) {
                    this.mostrarGrafica = false;
                } else {
                    this.mostrarGrafica = true;
                }
                this.doughnutChartData = [this.datosEstaditicasBar.notasAprobadas, this.datosEstaditicasBar.notasDevueltas, this.datosEstaditicasBar.notasPorAprobar, this.datosEstaditicasBar.notasAnuladas];
                this.ConsultarNotaContableServicio.getObtenerEstados().subscribe(
                    data => {
                        debugger;
                        this.listaEstado = data;
                        var i = 0;

                        for (let tipoEstado of this.listaEstado) {
                            switch (tipoEstado.idTipo) {
                                case 1:
                                    this.doughnutChartLabels[i] = tipoEstado.nombre + " (" + this.datosEstaditicasBar.notasPorAprobar + ")";
                                    i++;
                                    break;
                                case 3:
                                    this.doughnutChartLabels[i] = tipoEstado.nombre + " (" + this.datosEstaditicasBar.notasAnuladas + ")";
                                    i++;
                                    break;
                                case 4:
                                    this.doughnutChartLabels[i] = tipoEstado.nombre + " (" + this.datosEstaditicasBar.notasAprobadas + ")";
                                    i++;
                                    break
                                case 5:
                                    this.doughnutChartLabels[i] = tipoEstado.nombre + " (" + this.datosEstaditicasBar.notasDevueltas + ")";
                                    i++;
                                    break;
                                default:
                                    break;

                            }

                            //if (tipoEstado.idTipo != 2) {
                            //    this.doughnutChartLabels[i] = tipoEstado.nombre + " (" + this.datosEstaditicasBar.notasAprobadas+")";
                            //    i++;
                            //}
                        }

                    });

            });
    }

    recargarPagina() {
        location.reload(true);
    }

    verDetalles(notas, contentModificar) {

        this.tituloPOPUP = "APROBAR NOTAS CONTABLES - VER DETALLES";
        this.abierto(contentModificar);
        this.NotaSeleccionada = notas;
        this.idNotaC = notas.idNotaContable;
        this.ConsultarNotaContableServicio.getObtenerDetallesNotas(this.idNotaC).subscribe(
            data => {

                this.objDetalles = data;
            });

        this.ConsultarNotaContableServicio.getObtenerAdjuntosNota(this.idNotaC).subscribe(
            data => {
                this.listaAdjunto = data;
            });

        this.ConsultarNotaContableServicio.getObtenerProductosNota(this.idNotaC).subscribe(
            data => {
                this.listaProductosNotas = data;
            });

    }

    urlFile: string = null;
    nombreArchivo: string = null;


    downloadFile(adjuntos: archivosAdjuntosNota) {
        let fileName = (adjuntos.pathsArchivo + adjuntos.nombreArchivo);
        var fileType;
        fileType = "APPLICATION/octet-stream";

        this.ConsultarNotaContableServicio.DownloadFile(fileName, fileType)
            .subscribe(
                success => {
                    saveAs(success, adjuntos.nombreArchivo);
                },
                err => {
                    alert("Server error while downloading file.");
                }
            );
    }
    estadoAprobacion: number;
    mostrarObservacion: boolean = false;
    confirmarGuardarAprobacion(estado: number, contentModalConfirmacion) {

        this.estadoAprobacion = estado;
        this.tituloPOPUP = "CONFIRMACIÓN - APROBAR NOTA CONTABLE";

        if (estado == 4) {
            this.mensajePOPUP = "\u00BFDesea aprobar la nota contable?";
            this.mostrarObservacion = false
        } else if (estado == 5) {
            this.mostrarObservacion = true;
            this.habilitarConObservacion = true;
            this.mensajePOPUP = "\u00BFDesea devolver la nota contable?";
        } else if (estado == 3) {
            this.mostrarObservacion = true;
            this.habilitarConObservacion = true;
            this.mensajePOPUP = "\u00BFDesea anular la nota contable?";
        }

        this.abierto(contentModalConfirmacion);
    }

    inputObservaciones: string = '';
    habilitarBotonGuardar(value) {
        debugger;
        if (this.estadoAprobacion != 1) {
            if (value.length > 0) {
                this.habilitarConObservacion = false;
            } else {
                this.habilitarConObservacion = true;
            }
        } else {
            this.habilitarConObservacion = false;
        }
        this.inputObservaciones = value;
    }

    guardarAprobacion(mensajeModalError) {
        debugger;
        const nuevaAprobacion = new aprobacionNC();
        nuevaAprobacion.estadoAprobacion = this.estadoAprobacion;
        nuevaAprobacion.idFA = this.NotaSeleccionada.idFlujoAprobacion;
        nuevaAprobacion.idNC = this.NotaSeleccionada.idNotaContable;
        nuevaAprobacion.ordenA = this.NotaSeleccionada.orden;
        nuevaAprobacion.observacion = this.inputObservaciones;
        this.ServicioAprobacion.setNuevaAprobacion(nuevaAprobacion).subscribe(
            data => {
                if (this.estadoAprobacion == 4) {
                    this.mensajePOPUP = "Nota contable " + nuevaAprobacion.idNC + " aprobada correctamente ";
                } else if (this.estadoAprobacion == 5) {
                    this.mensajePOPUP = "Nota contable " + nuevaAprobacion.idNC + " devuelta correctamente ";
                } else if (this.estadoAprobacion == 3) {
                    this.mensajePOPUP = "Nota contable " + nuevaAprobacion.idNC + " rechazada correctamente ";

                }
                this.tituloPOPUP = "GUARDAR - APROBAR NOTA CONTABLE";
                this.abierto(mensajeModalError);
            });

    }

    

   
    
}